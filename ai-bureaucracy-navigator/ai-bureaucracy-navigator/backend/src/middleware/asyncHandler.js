/**
 * Express 4 does not forward rejected promises from async handlers to
 * next() automatically — an unhandled rejection (e.g. the DB being down)
 * would otherwise crash the process instead of returning a clean 5xx.
 * Wrap every async route handler with this.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

