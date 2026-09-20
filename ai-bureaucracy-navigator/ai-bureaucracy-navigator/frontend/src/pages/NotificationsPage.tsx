import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CheckCheck,
  Trash2,
  FileText,
  ClipboardList,
  Award,
  Info,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
} from 'lucide-react'
import { useNotifications, type AppNotification } from '@/context/NotificationContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

type FilterCategory = 'all' | 'unread' | 'application' | 'document' | 'scheme'

function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function getCategoryIcon(cat: AppNotification['category']) {
  switch (cat) {
    case 'application':
      return <ClipboardList size={18} className="text-blue-600" />
    case 'document':
      return <FileText size={18} className="text-emerald-600" />
    case 'scheme':
      return <Award size={18} className="text-amber-600" />
    default:
      return <Info size={18} className="text-purple-600" />
  }
}

function getCategoryBadge(cat: AppNotification['category']) {
  switch (cat) {
    case 'application':
      return <Badge tone="good">Application</Badge>
    case 'document':
      return <Badge tone="brand">Document</Badge>
    case 'scheme':
      return <Badge tone="warn">Scheme</Badge>
    default:
      return <Badge tone="neutral">System</Badge>
  }
}

export function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications()

  const [activeTab, setActiveTab] = useState<FilterCategory>('all')
  const [preferences, setPreferences] = useState({
    sms: true,
    email: true,
    push: true,
  })

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read
    if (activeTab === 'all') return true
    return n.category === activeTab
  })

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold text-ink">Notifications</h1>
            {unreadCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-bad-500 px-2 text-xs font-bold text-white shadow-xs">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Stay updated with real-time status alerts, document checks, and scheme recommendations.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              icon={<CheckCheck size={14} />}
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 size={14} />}
              onClick={clearAll}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
        {[
          { id: 'all' as const, label: 'All', count: notifications.length },
          { id: 'unread' as const, label: 'Unread', count: unreadCount },
          {
            id: 'application' as const,
            label: 'Applications',
            count: notifications.filter((n) => n.category === 'application').length,
          },
          {
            id: 'document' as const,
            label: 'Documents',
            count: notifications.filter((n) => n.category === 'document').length,
          },
          {
            id: 'scheme' as const,
            label: 'Schemes',
            count: notifications.filter((n) => n.category === 'scheme').length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`focus-ring flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-surface text-ink-soft hover:bg-canvas hover:text-ink border border-line/60'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-canvas text-ink-soft'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Grid: Notification list + Quick Preferences */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications list */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 mb-3">
                <Bell size={24} />
              </div>
              <h3 className="font-display text-base font-bold text-ink">No notifications</h3>
              <p className="mt-1 max-w-xs text-xs text-ink-soft">
                {activeTab === 'unread'
                  ? "You're all caught up! No unread messages."
                  : 'No notifications in this category yet.'}
              </p>
            </Card>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`group relative flex gap-4 rounded-2xl border p-4 transition-all duration-200 cursor-pointer ${
                  !item.read
                    ? 'border-brand-200 bg-brand-50/40 shadow-xs hover:border-brand-300'
                    : 'border-line bg-surface hover:bg-canvas/50'
                }`}
              >
                {/* Unread indicator */}
                {!item.read && (
                  <span className="absolute left-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500 ring-4 ring-brand-100" />
                )}

                {/* Category Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-line/60 shadow-2xs">
                  {getCategoryIcon(item.category)}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!item.read ? 'font-bold text-ink' : 'font-semibold text-ink'}`}>
                        {item.title}
                      </p>
                      {getCategoryBadge(item.category)}
                    </div>
                    <span className="text-[11px] font-medium text-ink-soft">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    {item.message}
                  </p>

                  {/* Actions & Links */}
                  <div className="mt-3 flex items-center justify-between gap-2 pt-1 border-t border-line/40">
                    {item.link ? (
                      <Link
                        to={item.link}
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(item.id)
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        <span>{item.actionLabel || 'View Details'}</span>
                        <ArrowRight size={13} />
                      </Link>
                    ) : <span />}

                    <div className="flex items-center gap-1">
                      {!item.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(item.id)
                          }}
                          className="focus-ring flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-ink-soft hover:bg-surface hover:text-ink transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle2 size={13} /> Mark read
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(item.id)
                        }}
                        className="focus-ring opacity-0 group-hover:opacity-100 rounded-lg p-1 text-ink-soft hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Delete notification"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar: Preferences & Summary */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal size={16} className="text-brand-500" />
              <h3 className="font-display text-sm font-bold text-ink">Alert Channels</h3>
            </div>
            <p className="text-xs text-ink-soft mb-4">
              Configure where you would like to receive critical application updates.
            </p>

            <div className="space-y-3">
              {[
                { key: 'push' as const, label: 'Push Notifications', desc: 'Instant desktop & mobile alerts' },
                { key: 'sms' as const, label: 'SMS Updates', desc: 'Reference numbers & stage changes' },
                { key: 'email' as const, label: 'Email Digest', desc: 'Detailed document reports' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className="flex items-start justify-between gap-3 cursor-pointer rounded-xl p-2 hover:bg-canvas transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-ink">{label}</p>
                    <p className="text-[11px] text-ink-soft">{desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences[key]}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, [key]: e.target.checked }))
                    }
                    className="mt-0.5 h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                </label>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-brand-50/60 to-indigo-50/60 border-brand-100">
            <div className="flex items-center gap-2 mb-2 text-brand-600 font-bold text-xs">
              <Sparkles size={16} /> CivicFlow Auto-Reminders
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">
              CivicFlow automatically tracks statutory timelines and sends notifications when documents are nearing expiry or when new eligibility schemes open.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
