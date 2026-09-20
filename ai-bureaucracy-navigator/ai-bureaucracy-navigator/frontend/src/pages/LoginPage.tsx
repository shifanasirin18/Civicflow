import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { CivicFlowLogo } from '@/components/ui/CivicFlowLogo'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await login(email || 'demo@example.com', password)
    setLoading(false)
    navigate('/app')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden px-4">
      {/* Background Image with subtle blur */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100 blur-[2px] scale-105"
        style={{ backgroundImage: "url('/landing-bg.jpeg')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/80 bg-surface/90 backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-6">
          <Link to="/" className="focus-ring inline-block rounded-xl">
            <CivicFlowLogo size="md" />
          </Link>
        </div>
        <h1 className="mb-1 font-display text-xl font-bold text-ink">Welcome back</h1>
        <p className="mb-6 text-sm text-ink-soft">Log in to continue your roadmap.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="focus-ring w-full rounded-xl border border-line/80 bg-white/90 px-3 py-2.5 text-sm shadow-2xs focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus-ring w-full rounded-xl border border-line/80 bg-white/90 px-3 py-2.5 text-sm shadow-2xs focus:bg-white transition-colors"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Signing in…' : 'Log In'}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-ink-soft">
          This is a demo login — any email/password works.
        </p>
        <p className="mt-3 text-center text-sm text-ink-soft">
          New here?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
