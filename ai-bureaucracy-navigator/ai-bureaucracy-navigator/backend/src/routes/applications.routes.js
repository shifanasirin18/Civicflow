import { Router } from 'express'
import { z } from 'zod'
import { query } from '../db/pool.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const applicationsRouter = Router()
applicationsRouter.use(requireAuth)

const mockApplicationsMap = new Map()

applicationsRouter.get('/', asyncHandler(async (req, res) => {
  try {
    const rows = await query('SELECT * FROM applications WHERE user_id = $1 ORDER BY last_updated DESC', [req.userId])
    return res.json({ applications: rows })
  } catch {
    const userApps = Array.from(mockApplicationsMap.values()).filter((a) => a.user_id === req.userId)
    return res.json({ applications: userApps })
  }
}))

const startSchema = z.object({ serviceId: z.string().min(1) })

applicationsRouter.post('/', asyncHandler(async (req, res) => {
  const parsed = startSchema.safeParse(req.body)
  if (!parsed.success) throw new ApiError(400, 'serviceId is required')

  const ref = `APP-${parsed.data.serviceId.toUpperCase()}-${Date.now().toString().slice(-6)}`
  try {
    const [app] = await query(
      `INSERT INTO applications (user_id, service_id, application_ref)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.userId, parsed.data.serviceId, ref],
    )
    return res.status(201).json({ application: app })
  } catch {
    const app = {
      id: `app-${Date.now()}`,
      user_id: req.userId,
      service_id: parsed.data.serviceId,
      application_ref: ref,
      status: 'documents_pending',
      current_step_index: 0,
      date_started: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    }
    mockApplicationsMap.set(app.id, app)
    return res.status(201).json({ application: app })
  }
}))

const advanceSchema = z.object({
  currentStepIndex: z.number().int().min(0),
  status: z.enum(['not_started', 'documents_pending', 'submitted', 'in_progress', 'completed']).optional(),
})

applicationsRouter.patch('/:id', asyncHandler(async (req, res) => {
  const parsed = advanceSchema.safeParse(req.body)
  if (!parsed.success) throw new ApiError(400, 'Invalid update payload')

  try {
    const [app] = await query(
      `UPDATE applications
       SET current_step_index = $1,
           status = COALESCE($2, status),
           last_updated = now()
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [parsed.data.currentStepIndex, parsed.data.status ?? null, req.params.id, req.userId],
    )
    if (app) return res.json({ application: app })
  } catch {
    // fallback below
  }

  const existing = mockApplicationsMap.get(req.params.id)
  if (!existing || existing.user_id !== req.userId) {
    throw new ApiError(404, 'Application not found')
  }

  existing.current_step_index = parsed.data.currentStepIndex
  if (parsed.data.status) existing.status = parsed.data.status
  existing.last_updated = new Date().toISOString()
  mockApplicationsMap.set(existing.id, existing)

  res.json({ application: existing })
}))

