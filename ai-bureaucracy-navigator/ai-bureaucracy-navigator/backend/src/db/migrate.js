import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from './pool.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function migrate() {
  console.log('Running database migrations...')
  const migrationsDir = path.join(__dirname, 'migrations')
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort()

  for (const file of files) {
    console.log(`Applying migration: ${file}`)
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
    await pool.query(sql)
  }
  // Ensure portal_name exists if older migration was run
  await pool.query('ALTER TABLE gov_services ADD COLUMN IF NOT EXISTS portal_name TEXT;')
  console.log('Migrations applied successfully!')
}

if (process.argv[1]?.endsWith('migrate.js')) {
  migrate()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Migration failed:', err)
      process.exit(1)
    })
}

