import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, ExternalLink, Globe, Grid } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ServiceLogo } from '@/components/ui/ServiceLogo'
import { useLanguage } from '@/context/LanguageContext'
import { services } from '@/data/services'
import type { ServiceCategory } from '@/types'

const categories: { id: ServiceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'identity', label: 'Identity Documents' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'employment', label: 'Employment' },
  { id: 'transport', label: 'Transport' },
  { id: 'business', label: 'Business Services' },
  { id: 'land', label: 'Land & Property' },
  { id: 'tax', label: 'Tax Services' },
  { id: 'welfare', label: 'Welfare Schemes' },
]

export function GovernmentServicesPage() {
  const { tb, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all')
  const [viewTab, setViewTab] = useState<'cards' | 'table'>('table')

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = category === 'all' || s.category === category
      const matchesQuery =
        !query ||
        s.name.en.toLowerCase().includes(query.toLowerCase()) ||
        s.portalName.toLowerCase().includes(query.toLowerCase()) ||
        s.officialUrl.toLowerCase().includes(query.toLowerCase()) ||
        s.keywords.some((k) => k.includes(query.toLowerCase()))
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Government Services &amp; Portal Directory</h1>
          <p className="text-sm text-ink-soft">Access official government portals, eligibility guides, and application roadmaps.</p>
        </div>
        <div className="flex items-center rounded-xl border border-line bg-surface p-1">
          <button
            onClick={() => setViewTab('table')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              viewTab === 'table' ? 'bg-brand-500 text-white shadow-xs' : 'text-ink-soft hover:text-ink'
            }`}
          >
            <Globe size={14} /> Official Portal Links Table
          </button>
          <button
            onClick={() => setViewTab('cards')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              viewTab === 'cards' ? 'bg-brand-500 text-white shadow-xs' : 'text-ink-soft hover:text-ink'
            }`}
          >
            <Grid size={14} /> Service Cards
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search service, portal, or website (e.g. Aadhaar, Income Tax, Passport)..."
            className="focus-ring w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`focus-ring rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                category === c.id ? 'bg-brand-500 text-white' : 'border border-line bg-surface text-ink-soft hover:bg-canvas'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {viewTab === 'table' ? (
        <Card padded={false} className="overflow-hidden border border-line shadow-xs">
          <div className="border-b border-line bg-surface px-6 py-5 text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Government Portal Links</h2>
            <p className="mt-1 text-sm text-ink-soft">Official government portals available on CivicFlow.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1e293b] text-xs uppercase tracking-wider text-slate-100">
                <tr>
                  <th scope="col" className="w-14 px-3 py-3.5 text-center font-bold">No.</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Service &amp; Organization</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Official Portal</th>
                  <th scope="col" className="px-5 py-3.5 font-bold">Official Website</th>
                  <th scope="col" className="w-28 px-4 py-3.5 text-center font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-surface">
                {filtered.map((s, idx) => (
                  <tr key={s.id} className="transition-colors hover:bg-canvas/60">
                    <td className="px-3 py-4 text-center font-medium text-ink-soft">{idx + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <ServiceLogo serviceId={s.id} portalName={s.portalName} size="sm" />
                        <div className="min-w-0">
                          <Link to={`/app/services/${s.id}`} className="font-semibold text-ink hover:text-brand-600 transition-colors">
                            {tb(s.name)}
                          </Link>
                          <p className="text-xs text-ink-soft line-clamp-1">{tb(s.department)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone="brand" className="font-medium text-xs">{s.portalName}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={s.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-600 hover:text-brand-700 hover:underline"
                      >
                        {s.officialUrl.replace('https://', '')}
                        <ExternalLink size={13} className="shrink-0" />
                      </a>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Link
                        to={`/app/services/${s.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-100 transition-colors"
                      >
                        Guide <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-ink-soft">
                      No government portal links found matching "{query}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <Card key={s.id} className="flex flex-col group hover:border-brand-300 hover:shadow-md transition-all duration-200">
              <div className="mb-3 flex items-start gap-3">
                <ServiceLogo serviceId={s.id} portalName={s.portalName} size="md" />
                <div className="flex-1 min-w-0">
                  <Link to={`/app/services/${s.id}`} className="font-semibold text-ink hover:text-brand-600 transition-colors line-clamp-1">
                    {tb(s.name)}
                  </Link>
                  <p className="text-xs text-ink-soft line-clamp-1 mt-0.5">{tb(s.department)}</p>
                  <div className="mt-1.5">
                    <Badge tone="brand" className="text-[11px] py-0.5 px-2">{s.portalName}</Badge>
                  </div>
                </div>
              </div>

              <p className="mb-3 flex-1 text-sm text-ink-soft line-clamp-2">{tb(s.description)}</p>

              <div className="mb-4 rounded-xl border border-line bg-canvas p-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">OFFICIAL PORTAL</p>
                <a
                  href={s.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 font-mono text-xs text-brand-600 hover:underline"
                >
                  {s.officialUrl} <ExternalLink size={12} />
                </a>
              </div>

              <Link
                to={`/app/services/${s.id}`}
                className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-100 transition-colors"
              >
                {t('start_service')} <ArrowRight size={14} />
              </Link>
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-sm text-ink-soft">No services match your search.</p>}
        </div>
      )}
    </div>
  )
}
