import jwt from 'jsonwebtoken'
import { ApiError } from './errorHandler.js'

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Missing or invalid Authorization header')
  }
  const token = header.slice('Bearer '.length)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret-change-me')
    req.userId = payload.sub
    next()
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }
}

