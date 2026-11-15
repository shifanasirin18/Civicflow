import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ai_bureaucracy_navigator',
})

pool.on('error', (err) => {
  console.error('Unexpected Postgres client error:', err.message)
})

export async function query(text, params) {
  const result = await pool.query(text, params)
  return result.rows
}

