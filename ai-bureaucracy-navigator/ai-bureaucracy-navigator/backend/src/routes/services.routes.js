import { Router } from 'express'
import { query } from '../db/pool.js'
import { seedServices } from '../data/seedServices.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const servicesRouter = Router()

function mapRowToService(row) {
  return {
    id: row.id,
    name: { en: row.name_en, ta: row.name_ta },
    category: row.category,
    department: { en: row.department_en, ta: row.department_ta },
    description: { en: row.description_en, ta: row.description_ta },
    eligibility: typeof row.eligibility === 'string' ? JSON.parse(row.eligibility) : row.eligibility || [],
    documents: typeof row.documents === 'string' ? JSON.parse(row.documents) : row.documents || [],
    steps: typeof row.steps === 'string' ? JSON.parse(row.steps) : row.steps || [],
    commonMistakes: typeof row.common_mistakes === 'string' ? JSON.parse(row.common_mistakes) : row.common_mistakes || [],
    officialUrl: row.official_url,
    portalName: row.portal_name || undefined,
    feeNote: typeof row.fee_note === 'string' ? JSON.parse(row.fee_note) : row.fee_note || null,
    processingTimeNote: typeof row.processing_time_note === 'string' ? JSON.parse(row.processing_time_note) : row.processing_time_note || null,
    keywords: row.keywords || [],
    isDemoData: row.is_demo_data,
  }
}

/**
 * Reads from gov_services in PostgreSQL, falling back to in-memory demo data
 * if the DB isn't reachable.
 */
servicesRouter.get('/', asyncHandler(async (req, res) => {
  const category = req.query.category
  try {
    const rows = await query(
      category && category !== 'all'
        ? 'SELECT * FROM gov_services WHERE category = $1 ORDER BY name_en'
        : 'SELECT * FROM gov_services ORDER BY name_en',
      category && category !== 'all' ? [category] : [],
    )
    return res.json({ services: rows.map(mapRowToService), source: 'database' })
  } catch {
    const filtered = category && category !== 'all' ? seedServices.filter((s) => s.category === category) : seedServices
    return res.json({ services: filtered, source: 'demo-fallback' })
  }
}))

servicesRouter.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const [row] = await query('SELECT * FROM gov_services WHERE id = $1', [id])
    if (row) return res.json({ service: mapRowToService(row), source: 'database' })
  } catch {
    // fall through to demo data below
  }
  const service = seedServices.find((s) => s.id === id)
  if (!service) throw new ApiError(404, 'Service not found')
  res.json({ service, source: 'demo-fallback' })
}))

