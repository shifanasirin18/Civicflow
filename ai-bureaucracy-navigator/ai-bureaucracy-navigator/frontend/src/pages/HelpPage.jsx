import { Card, CardHeader } from '@/components/ui/Card'

const faqs = [
  {
    q: 'Does this app submit my application for me?',
    a: 'No. The assistant gives AI Guidance — eligibility, documents, and a roadmap. You always complete and submit the application yourself on the official government portal.',
  },
  {
    q: 'Is my uploaded document checked for legal authenticity?',
    a: 'No. The Document Scanner runs a Document Quality & Information Check — it looks for expected fields and image clarity, not legal validity.',
  },
  {
    q: 'Is the service information on this site official?',
    a: 'This build uses demo/placeholder data for development. Every fee, timeline, and URL is clearly marked and should be replaced with verified official sources before going live.',
  },
  {
    q: 'What languages are supported?',
    a: 'English and Tamil today, with the interface built so more Indian languages can be added later.',
  },
]

export function HelpPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Help & Guidance</h1>
        <p className="text-sm text-ink-soft">Common questions about how CivicFlow works.</p>
      </div>
      <Card>
        <CardHeader title="Frequently asked questions" />
        <div className="divide-y divide-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-3">
              <summary className="cursor-pointer list-none text-sm font-medium text-ink marker:hidden">{f.q}</summary>
              <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Card>
    </div>
  )
}
