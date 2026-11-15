import { pool } from './pool.js'
import { seedServices } from '../data/seedServices.js'

export async function seed() {
  console.log('Seeding government services...')
  for (const s of seedServices) {
    await pool.query(
      `INSERT INTO gov_services (
        id, name_en, name_ta, category, department_en, department_ta,
        description_en, description_ta, eligibility, documents, steps,
        common_mistakes, official_url, portal_name, fee_note, processing_time_note,
        keywords, is_demo_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO UPDATE SET
        name_en = EXCLUDED.name_en,
        name_ta = EXCLUDED.name_ta,
        category = EXCLUDED.category,
        department_en = EXCLUDED.department_en,
        department_ta = EXCLUDED.department_ta,
        description_en = EXCLUDED.description_en,
        description_ta = EXCLUDED.description_ta,
        eligibility = EXCLUDED.eligibility,
        documents = EXCLUDED.documents,
        steps = EXCLUDED.steps,
        common_mistakes = EXCLUDED.common_mistakes,
        official_url = EXCLUDED.official_url,
        portal_name = EXCLUDED.portal_name,
        fee_note = EXCLUDED.fee_note,
        processing_time_note = EXCLUDED.processing_time_note,
        keywords = EXCLUDED.keywords,
        is_demo_data = EXCLUDED.is_demo_data,
        updated_at = now()`,
      [
        s.id,
        s.name.en,
        s.name.ta,
        s.category,
        s.department.en,
        s.department.ta,
        s.description.en,
        s.description.ta,
        JSON.stringify(s.eligibility),
        JSON.stringify(s.documents),
        JSON.stringify(s.steps),
        JSON.stringify(s.commonMistakes),
        s.officialUrl,
        s.portalName ?? null,
        JSON.stringify(s.feeNote),
        JSON.stringify(s.processingTimeNote),
        s.keywords,
        s.isDemoData,
      ],
    )
  }
  console.log(`Seeded ${seedServices.length} government services successfully!`)
}

if (process.argv[1]?.endsWith('seed.js')) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err)
      process.exit(1)
    })
}

