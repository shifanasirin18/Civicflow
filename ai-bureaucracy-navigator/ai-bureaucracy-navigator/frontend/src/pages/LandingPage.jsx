import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquareText, ScanLine, Map, BellRing } from 'lucide-react'
import { CivicFlowLogo } from '@/components/ui/CivicFlowLogo'
import { GovernmentServicesLogoLoop } from '@/components/ui/GovernmentServicesLogoLoop'

const oldWay = ['Search', 'Find a portal', 'Understand the procedure', 'Collect documents', 'Apply', 'Track']
const newWay = ['Explain your problem in plain language', 'AI understands', 'Personalized roadmap', 'Document check', 'Official portal', 'Track']

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Image with slight blur effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100 blur-[2px] scale-105"
        style={{ backgroundImage: "url('/landing-bg.jpeg')" }}
        aria-hidden="true"
      />

      {/* Page Content */}
      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-5 sm:px-10 backdrop-blur-sm">
          <Link to="/" className="focus-ring rounded-xl">
            <CivicFlowLogo size="md" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="focus-ring rounded-xl bg-white/70 backdrop-blur-md px-4 py-2 text-sm font-semibold text-ink border border-white/60 shadow-xs hover:shadow-md hover:bg-white hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="focus-ring rounded-xl bg-gradient-to-r from-[#FFAE19] via-[#E6FF26] to-[#44FF62] px-5 py-2 text-sm font-extrabold text-slate-950 shadow-md shadow-[#FFAE19]/25 hover:shadow-xl hover:shadow-[#44FF62]/35 hover:-translate-y-0.5 active:translate-y-0.5 border border-white/40 transition-all duration-200"
            >
              Get started
            </Link>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              Government services, made simple.
            </h1>
            <p className="mt-4 max-w-md text-base text-ink-soft">
              Tell us what you need. AI guides you through the process, checks your documents, and takes you to the
              right official portal.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="focus-ring group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#FFAE19] via-[#E6FF26] to-[#44FF62] px-6 py-3.5 text-base font-black text-slate-950 shadow-lg shadow-[#FFAE19]/30 hover:shadow-2xl hover:shadow-[#44FF62]/45 hover:-translate-y-1 active:translate-y-0.5 border border-white/50 transition-all duration-200"
              >
                Start a Service <ArrowRight size={18} className="text-slate-950 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white/90 backdrop-blur-md px-6 py-3.5 text-base font-bold text-ink shadow-md shadow-slate-300/30 hover:shadow-xl hover:bg-white hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-line/80 bg-surface/85 backdrop-blur-md p-6 shadow-sm">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
              <MessageSquareText size={16} className="text-[#FFAE19]" /> CivicFlow AI Assistant
            </p>
            <div className="space-y-3 text-sm">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#FFAE19] via-[#E6FF26] to-[#44FF62] px-4 py-2.5 text-slate-950 font-bold shadow-xs">
                I want to apply for a PAN card.
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-canvas/90 backdrop-blur-sm px-4 py-2.5 text-ink">
                Sure — here's who can apply, the documents you need, and a step-by-step roadmap to the official portal.
              </div>
            </div>
          </div>
        </section>

        {/* Official Government Services Logo Loop (React Bits LogoLoop) */}
        <GovernmentServicesLogoLoop />

        <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">Why this is different</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line/80 bg-surface/85 backdrop-blur-md p-6 shadow-xs">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Existing government websites</p>
              <ol className="space-y-2 text-sm text-ink-soft">
                {oldWay.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-canvas text-[11px] text-ink-soft">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-[#FFAE19]/40 bg-gradient-to-br from-[#FFAE19]/10 via-[#E6FF26]/10 to-[#44FF62]/10 backdrop-blur-md p-6 shadow-xs">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-900">CivicFlow</p>
              <ol className="space-y-2 text-sm text-ink">
                {newWay.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#FFAE19] to-[#44FF62] text-[11px] font-black text-slate-950 shadow-2xs">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-soft">
            The platform acts as a navigation and assistance layer — not a replacement for official government
            portals.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: ScanLine, title: 'Document check', body: 'Upload a document and see what\u2019s missing or low quality before you apply.' },
              { icon: Map, title: 'Personalized roadmap', body: 'A clear, ordered path from eligibility to receiving your document.' },
              { icon: BellRing, title: 'Application tracking', body: 'Follow status and get reminders for what to do next.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-line/80 bg-surface/85 backdrop-blur-md p-6 shadow-xs">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFAE19]/25 via-[#E6FF26]/25 to-[#44FF62]/25 text-slate-900 ring-1 ring-[#FFAE19]/30">
                  <Icon size={18} className="text-slate-900" />
                </span>
                <p className="mb-1 text-sm font-semibold text-ink">{title}</p>
                <p className="text-sm text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
