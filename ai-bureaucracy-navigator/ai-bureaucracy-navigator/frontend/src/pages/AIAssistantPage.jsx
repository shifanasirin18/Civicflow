import { useEffect, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Send, Bot, User as UserIcon, Info, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ServiceLogo } from '@/components/ui/ServiceLogo'
import { useLanguage } from '@/context/LanguageContext'
import { getAssistantReply } from '@/lib/mockAssistant'
import { findServiceById } from '@/data/services'

function ServiceMiniCard({ service }) {
  const { tb, t } = useLanguage()
  return (
    <Card className="mt-2 max-w-lg" padded>
      <div className="mb-2 flex items-center gap-3">
        <ServiceLogo serviceId={service.id} portalName={service.portalName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink line-clamp-1">{tb(service.name)}</p>
          <Badge tone="brand" className="text-[10px] py-0 px-1.5">{service.portalName}</Badge>
        </div>
      </div>
      <p className="mb-3 text-sm text-ink-soft">{tb(service.description)}</p>
      <div className="mb-3 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('eligibility')}</p>
          <ul className="space-y-1 text-ink-soft">
            {service.eligibility.slice(0, 2).map((e, i) => (
              <li key={i}>• {tb(e)}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t('required_documents')}</p>
          <ul className="space-y-1 text-ink-soft">
            {service.documents.slice(0, 3).map((d, i) => (
              <li key={i}>• {tb(d)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2 text-xs">
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono font-medium text-brand-600 hover:underline"
        >
          {service.portalName} ({service.officialUrl.replace('https://', '')}) <ExternalLink size={12} />
        </a>
        <Link to={`/app/services/${service.id}`} className="inline-flex items-center gap-1 font-semibold text-brand-600">
          View Roadmap <ExternalLink size={12} />
        </Link>
      </div>
    </Card>
  )
}

export function AIAssistantPage() {
  const { lang } = useLanguage()
  const [params] = useSearchParams()
  const [messages, setMessages] = useState([
    {
      id: 'm0',
      role: 'assistant',
      text: 'Sure. I can guide you through most government services. Try something like "I lost my Aadhaar card" or "I want a scholarship".',
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  const send = (text) => {
    if (!text.trim()) return
    const userMsg = { id: crypto.randomUUID(), role: 'user', text, timestamp: new Date().toISOString() }
    const reply = getAssistantReply(text, lang)
    const assistantMsg = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: reply.text,
      serviceCardId: reply.matchedService?.id,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
  }

  useEffect(() => {
    const initial = params.get('q')
    if (initial) send(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-3xl flex-col">
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50/60 px-4 py-2.5 text-xs text-brand-700">
        <Info size={14} className="shrink-0" />
        AI Guidance, not Official Government Action — this assistant helps you prepare; you always apply on the official portal.
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                m.role === 'user' ? 'bg-canvas text-ink-soft' : 'bg-gradient-to-br from-brand-500 to-teal-400 text-white'
              }`}
            >
              {m.role === 'user' ? <UserIcon size={15} /> : <Bot size={15} />}
            </span>
            <div className={`max-w-[80%] ${m.role === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === 'user' ? 'bg-brand-500 text-white' : 'bg-surface text-ink'
                }`}
              >
                {m.text}
              </div>
              {m.serviceCardId && findServiceById(m.serviceCardId) && (
                <ServiceMiniCard service={findServiceById(m.serviceCardId)} />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Describe what you need — e.g. I need a caste certificate"
          className="focus-ring w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
        />
        <button
          onClick={() => send(input)}
          className="focus-ring flex items-center justify-center rounded-xl bg-brand-500 px-4 text-white hover:bg-brand-600"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

