import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { authRouter } from './routes/auth.routes.js'
import { servicesRouter } from './routes/services.routes.js'
import { applicationsRouter } from './routes/applications.routes.js'
import { documentsRouter } from './routes/documents.routes.js'
import { chatRouter } from './routes/chat.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRouter)
app.use('/api/services', servicesRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api/documents', documentsRouter)
app.use('/api/chat', chatRouter)

// Keep error handling last
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`CivicFlow API listening on http://localhost:${PORT}`)
})
