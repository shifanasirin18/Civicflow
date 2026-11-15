import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, Dot } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useLanguage } from '@/context/LanguageContext'
import { useAppData } from '@/context/AppDataContext'
import { findServiceById } from '@/data/services'

const statusTone = {
  completed: 'good',
  in_progress: 'brand',
  documents_pending: 'warn',
  not_started: 'neutral',
  submitted: 'brand',
} 

const statusLabel = {
  completed: 'Completed',
  in_progress: 'Processing',
  documents_pending: 'Documents Pending',
  not_started: 'Not Started',
  submitted: 'Submitted',
}

export function ApplicationTrackerPage() {
  const { tb } = useLanguage()
  const { applications } = useAppData()

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Application Tracker</h1>
        <p className="text-sm text-ink-soft">Follow the status of every service you\u2019ve started.</p>
      </div>

      {applications.length === 0 && (
        <p className="text-sm text-ink-soft">
          No applications yet. <Link to="/app/services" className="font-medium text-brand-600">Browse services</Link> to start one.
        </p>
      )}

      {applications.map((app) => {
        const service = findServiceById(app.serviceId)
        if (!service) return null
        return (
          <Card key={app.id}>
            <CardHeader
              title={tb(service.name)}
              action={<Badge tone={statusTone[app.status]}>{statusLabel[app.status]}</Badge>}
            />
            <div className="mb-5 grid gap-4 text-sm sm:grid-cols-4">
              <div>
                <p className="text-xs text-ink-soft">Application ID</p>
                <p className="font-medium text-ink">{app.applicationRef}</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft">Department</p>
                <p className="font-medium text-ink">{tb(service.department)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft">Date Started</p>
                <p className="font-medium text-ink">{app.dateStarted}</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft">Last Updated</p>
                <p className="font-medium text-ink">{app.lastUpdated}</p>
              </div>
            </div>

            <div className="space-y-3 border-l-2 border-line pl-4">
              {service.steps.map((step, i) => {
                const done = i < app.currentStepIndex
                const current = i === app.currentStepIndex
                return (
                  <div key={step.id} className="relative flex items-start gap-2 -ml-[21px]">
                    {done ? (
                      <CheckCircle2 size={18} className="shrink-0 bg-canvas text-good-500" />
                    ) : current ? (
                      <Dot size={18} className="shrink-0 bg-canvas text-brand-500" />
                    ) : (
                      <Circle size={18} className="shrink-0 bg-canvas text-line" />
                    )}
                    <p className={`text-sm ${done ? 'text-ink-soft line-through' : current ? 'font-medium text-brand-600' : 'text-ink-soft'}`}>
                      {tb(step.title)}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
