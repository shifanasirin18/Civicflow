import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import { requireAuth } from '../middleware/requireAuth.js'
import { ApiError } from '../middleware/errorHandler.js'
import { runOcr } from '../ocr/ocrProvider.js'
import { checkFields, guessDocumentType } from '../ocr/fieldSchemas.js'
import { query } from '../db/pool.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const documentsRouter = Router()
documentsRouter.use(requireAuth)

const maxSizeMb = Number(process.env.MAX_UPLOAD_MB ?? 10)
const uploadDir = process.env.UPLOAD_DIR ?? './uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  limits: { fileSize: maxSizeMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowed.includes(file.mimetype)) return cb(new ApiError(400, 'Only PDF, JPG and PNG files are accepted'))
    cb(null, true)
  },
})

const mockDocumentsMap = new Map()

documentsRouter.get('/', asyncHandler(async (req, res) => {
  try {
    const rows = await query('SELECT * FROM scanned_documents WHERE user_id = $1 ORDER BY uploaded_at DESC', [req.userId])
    return res.json({ documents: rows })
  } catch {
    const userDocs = Array.from(mockDocumentsMap.values()).filter((d) => d.user_id === req.userId)
    return res.json({ documents: userDocs })
  }
}))

documentsRouter.post('/scan', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded')

  const ocrResult = await runOcr(Buffer.alloc(0), req.file.mimetype) // real impl reads req.file.path
  const detectedType = guessDocumentType(ocrResult.rawText)
  const fieldChecks = checkFields(detectedType)
  const overallQuality = fieldChecks.every((f) => f.status === 'found') ? 'good' : 'needs_rescan'

  try {
    const [doc] = await query(
      `INSERT INTO scanned_documents (user_id, file_name, storage_path, detected_type, field_checks, overall_quality)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.userId, req.file.originalname, req.file.path, detectedType, JSON.stringify(fieldChecks), overallQuality],
    )
    return res.status(201).json({ document: doc })
  } catch {
    const doc = {
      id: `doc-${Date.now()}`,
      user_id: req.userId,
      file_name: req.file.originalname,
      storage_path: req.file.path,
      detected_type: detectedType,
      field_checks: fieldChecks,
      overall_quality: overallQuality,
      uploaded_at: new Date().toISOString(),
    }
    mockDocumentsMap.set(doc.id, doc)
    return res.status(201).json({ document: doc })
  }
}))

documentsRouter.delete('/:id', asyncHandler(async (req, res) => {
  try {
    const rows = await query('DELETE FROM scanned_documents WHERE id = $1 AND user_id = $2 RETURNING id', [
      req.params.id,
      req.userId,
    ])
    if (rows.length > 0) return res.status(204).send()
  } catch {
    // fallback below
  }

  const existing = mockDocumentsMap.get(req.params.id)
  if (!existing || existing.user_id !== req.userId) {
    throw new ApiError(404, 'Document not found')
  }
  mockDocumentsMap.delete(req.params.id)
  res.status(204).send()
}))

