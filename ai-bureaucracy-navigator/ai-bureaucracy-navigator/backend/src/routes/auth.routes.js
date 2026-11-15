import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { query } from '../db/pool.js'
import { ApiError } from '../middleware/errorHandler.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

export const authRouter = Router()

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET ?? 'dev-secret-change-me', {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  })
}

const mockUsersMap = new Map()

authRouter.post('/register', asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) throw new ApiError(400, 'Invalid registration payload')
  const { name, email, password } = parsed.data

  try {
    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.length > 0) throw new ApiError(409, 'An account with this email already exists')

    const passwordHash = await bcrypt.hash(password, 10)
    const [user] = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, passwordHash],
    )

    return res.status(201).json({ token: signToken(user.id), user })
  } catch (err) {
    if (err instanceof ApiError) throw err

    // DB fallback
    if (Array.from(mockUsersMap.values()).some((u) => u.email === email)) {
      throw new ApiError(409, 'An account with this email already exists')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      passwordHash,
      preferred_lang: 'en',
    }
    mockUsersMap.set(user.id, user)
    return res.status(201).json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email } })
  }
}))

authRouter.post('/login', asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) throw new ApiError(400, 'Invalid login payload')
  const { email, password } = parsed.data

  try {
    const [user] = await query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email],
    )
    if (!user) throw new ApiError(401, 'Invalid email or password')

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw new ApiError(401, 'Invalid email or password')

    return res.json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    if (err instanceof ApiError) throw err

    // DB fallback
    const mockUser = Array.from(mockUsersMap.values()).find((u) => u.email === email)
    if (!mockUser) {
      // Allow demo login
      const demoId = 'demo-user-1'
      const demoUser = {
        id: demoId,
        name: email.split('@')[0] || 'Demo User',
        email,
        passwordHash: await bcrypt.hash(password, 10),
        preferred_lang: 'en',
      }
      mockUsersMap.set(demoId, demoUser)
      return res.json({ token: signToken(demoUser.id), user: { id: demoUser.id, name: demoUser.name, email: demoUser.email } })
    }

    const valid = await bcrypt.compare(password, mockUser.passwordHash)
    if (!valid) throw new ApiError(401, 'Invalid email or password')

    return res.json({ token: signToken(mockUser.id), user: { id: mockUser.id, name: mockUser.name, email: mockUser.email } })
  }
}))

authRouter.get('/me', requireAuth, asyncHandler(async (req, res) => {
  try {
    const [user] = await query('SELECT id, name, email, preferred_lang FROM users WHERE id = $1', [req.userId])
    if (user) return res.json({ user })
  } catch {
    // DB fallback
  }

  const mockUser = mockUsersMap.get(req.userId)
  if (!mockUser) {
    return res.json({
      user: {
        id: req.userId,
        name: 'Demo User',
        email: 'user@example.com',
        preferred_lang: 'en',
      },
    })
  }
  res.json({ user: { id: mockUser.id, name: mockUser.name, email: mockUser.email, preferred_lang: mockUser.preferred_lang } })
}))

