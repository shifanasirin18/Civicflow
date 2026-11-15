import { useNavigate, useParams, Link } from 'react-router-dom'
import { CheckCircle2, AlertTriangle, ExternalLink, ArrowLeft, Globe } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ServiceLogo } from '@/components/ui/ServiceLogo'
import { useLanguage } from '@/context/LanguageContext'
import { useAppData } from '@/context/AppDataContext'
import { findServiceById } from '@/data/services'

export function ServiceDetailsPage() {
  const { serviceId } = useParams()
  const { tb, t } = useLanguage()
  const { startApplication } = useAppData()
  const navigate = useNavigate()

  const service = serviceId ? findServiceById(serviceId) : undefined

  if (!service) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-sm text-ink-soft">Service not found.</p>
        <Link to="/app/services" className="text-sm font-medium text-brand-600">
          Back to Government Services
        </Link>
      </div>
    )
  }

  const onStart = () => {
    startApplication(service.id)
    navigate('/app/roadmap')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link to="/app/services" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft size={14} /> Government Services
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <ServiceLogo serviceId={service.id} portalName={service.portalName} size="lg" />
          <div>
            <div className="mb-1 flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-2xl font-bold text-ink">{tb(service.name)}</h1>
              <Badge tone="brand">{service.portalName}</Badge>
            </div>
            <p className="text-sm text-ink-soft">{tb(service.department)}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={service.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:bg-canvas"
          >
            <Globe size={15} className="text-brand-500" /> Open Official Portal <ExternalLink size={14} />
          </a>
          <Button onClick={onStart}>{t('start_service')}</Button>
        </div>
      </div>

      <Card>
        <p className="text-sm text-ink">{tb(service.description)}</p>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader title={t('eligibility')} />
          <ul className="space-y-2 text-sm text-ink-soft">
            {service.eligibility.map((e, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-good-500" /> {tb(e)}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title={t('required_documents')} />
          <ul className="space-y-2 text-sm text-ink-soft">
            {service.documents.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" /> {tb(d)}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader title="Roadmap Preview" />
        <ol className="space-y-3">
          {service.steps.map((step, i) => (
            <li key={step.id} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{tb(step.title)}</p>
                <p className="text-xs text-ink-soft">{tb(step.description)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardHeader title={t('common_mistakes')} />
        <ul className="space-y-2 text-sm text-ink-soft">
          {service.commonMistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-warn-500" /> {tb(m)}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('fee')}</p>
          <p className="mt-1 text-sm text-ink">{tb(service.feeNote)}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('processing_time')}</p>
          <p className="mt-1 text-sm text-ink">{tb(service.processingTimeNote)}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('official_portal')}</p>
          <div className="mt-1 flex flex-col gap-0.5">
            <span className="text-xs font-medium text-ink">{service.portalName}</span>
            <a
              href={service.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-brand-600 hover:underline"
            >
              {service.officialUrl} <ExternalLink size={12} />
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}
