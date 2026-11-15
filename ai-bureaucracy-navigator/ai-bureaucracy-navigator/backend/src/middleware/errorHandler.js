export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message })
  }
  console.error(err)
  return res.status(500).json({ error: 'Internal server error' })
}

