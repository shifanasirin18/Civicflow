import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { useAppData } from '@/context/AppDataContext'
import { findServiceById } from '@/data/services'

export function RoadmapPage() {
  const { tb, t } = useLanguage()
  const { applications, advanceApplication } = useAppData()

  const active = applications.filter((a) => a.status !== 'completed')

  if (active.length === 0) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm text-ink-soft">No active roadmap yet. Start a service to generate one.</p>
        <Link to="/app/services" className="text-sm font-medium text-brand-600">
          Browse Government Services
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="font-display text-xl font-bold text-ink">My Roadmap</h1>
      {active.map((app) => {
        const service = findServiceById(app.serviceId)
        if (!service) return null
        const progress = Math.round(((app.currentStepIndex + 1) / service.steps.length) * 100)

        return (
          <Card key={app.id}>
            <CardHeader
              title={tb(service.name)}
              action={
                <div className="flex items-center gap-3">
                  <a
                    href={service.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
                  >
                    Official Portal ({service.portalName}) <ExternalLink size={12} />
                  </a>
                  <Link to={`/app/services/${service.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-ink">
                    Details
                  </Link>
                </div>
              }
            />
            <div className="mb-6">
              <div className="mb-1.5 flex items-center justify-between text-xs text-ink-soft">
                <span>Overall Progress</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </div>

            <ol className="space-y-4">
              {service.steps.map((step, i) => {
                const done = i < app.currentStepIndex
                const current = i === app.currentStepIndex
                return (
                  <li key={step.id} className="flex gap-3">
                    {done ? (
                      <CheckCircle2 size={20} className="shrink-0 text-good-500" />
                    ) : (
                      <Circle size={20} className={`shrink-0 ${current ? 'text-brand-500' : 'text-line'}`} />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${current ? 'text-brand-600' : 'text-ink'}`}>{tb(step.title)}</p>
                      <p className="text-xs text-ink-soft">{tb(step.description)}</p>
                      {current && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="mt-2"
                          onClick={() =>
                            advanceApplication(
                              app.id,
                              Math.min(app.currentStepIndex + 1, service.steps.length - 1),
                              i === service.steps.length - 1 ? 'completed' : 'in_progress',
                            )
                          }
                        >
                          Mark step complete
                        </Button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
            <p className="mt-4 text-xs text-ink-soft">{t('ai_guidance_disclaimer')}</p>
          </Card>
        )
      })}
    </div>
  )
}
