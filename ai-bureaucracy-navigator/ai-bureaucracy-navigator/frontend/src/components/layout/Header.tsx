import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Bell,
  ChevronDown,
  Globe,
  LogOut,
  User as UserIcon,
  CheckCheck,
  ArrowRight,
  ClipboardList,
  FileText,
  Award,
  Info,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { useNotifications, type AppNotification } from '@/context/NotificationContext'

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
      return <ClipboardList size={14} className="text-blue-600" />
    case 'document':
      return <FileText size={14} className="text-emerald-600" />
    case 'scheme':
      return <Award size={14} className="text-amber-600" />
    default:
      return <Info size={14} className="text-purple-600" />
  }
}

export function Header() {
  const { lang, setLang, t } = useLanguage()
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false)
      }
    }
    if (menuOpen || langOpen || notifOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen, langOpen, notifOpen])

  return (
    <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
      <div className="relative hidden flex-1 max-w-xl sm:block">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          className="focus-ring w-full rounded-xl border border-line bg-canvas py-2.5 pl-9 pr-3 text-sm placeholder:text-ink-soft/70"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="focus-ring flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-medium text-ink-soft hover:bg-canvas"
            aria-label="Select language"
          >
            <Globe size={14} />
            {lang === 'en' ? 'EN' : lang === 'ta' ? 'தமிழ்' : 'हिंदी'}
            <ChevronDown size={12} className="text-ink-soft" />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-36 rounded-2xl border border-line bg-surface p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
              {[
                { code: 'en' as const, label: 'English (EN)' },
                { code: 'ta' as const, label: 'தமிழ் (Tamil)' },
                { code: 'hi' as const, label: 'हिंदी (Hindi)' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code)
                    setLangOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    lang === l.code ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-ink-soft hover:bg-canvas hover:text-ink'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown Button */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="focus-ring relative rounded-xl border border-line p-2.5 text-ink-soft hover:bg-canvas transition-colors"
            aria-label="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-bad-500 text-[10px] font-bold text-white shadow-xs animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Popover Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-line bg-surface p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b border-line px-3 py-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-ink">Notifications</p>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="focus-ring flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-brand-600 hover:bg-brand-50 transition-colors"
                  >
                    <CheckCheck size={13} />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification list in dropdown */}
              <div className="max-h-80 overflow-y-auto divide-y divide-line/40 py-1 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-xs text-ink-soft">No notifications yet</p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        markAsRead(item.id)
                        if (item.link) {
                          setNotifOpen(false)
                          navigate(item.link)
                        }
                      }}
                      className={`flex gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                        !item.read ? 'bg-brand-50/50 hover:bg-brand-50/80' : 'hover:bg-canvas'
                      }`}
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-line/50 shadow-2xs">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`truncate text-xs ${!item.read ? 'font-bold text-ink' : 'font-medium text-ink'}`}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-ink-soft shrink-0">
                            {formatTimeAgo(item.timestamp)}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-[11px] text-ink-soft mt-0.5 leading-snug">
                          {item.message}
                        </p>
                      </div>
                      {!item.read && (
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer: View all */}
              <div className="border-t border-line pt-2 pb-1 px-1">
                <Link
                  to="/app/notifications"
                  onClick={() => setNotifOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-canvas py-2 text-xs font-bold text-brand-600 hover:bg-brand-50 transition-colors"
                >
                  <span>View all notifications</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="focus-ring flex items-center gap-2 rounded-xl border border-line py-1.5 pl-1.5 pr-2.5 hover:bg-canvas"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-600">
              {(user?.name ?? 'U').slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden text-sm font-medium text-ink sm:inline">{user?.name ?? 'User'}</span>
            <ChevronDown size={14} className="text-ink-soft" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-surface p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2.5 rounded-xl bg-canvas p-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                  {(user?.name ?? 'U').slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{user?.name ?? 'User'}</p>
                  <p className="truncate text-xs text-ink-soft">{user?.email ?? 'user@example.com'}</p>
                </div>
              </div>
              <div className="my-1.5 border-t border-line" />
              <Link
                to="/app/notifications"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft hover:bg-canvas hover:text-ink transition-colors"
              >
                <Bell size={16} />
                Notifications
              </Link>
              <Link
                to="/app/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft hover:bg-canvas hover:text-ink transition-colors"
              >
                <UserIcon size={16} />
                Profile &amp; Settings
              </Link>
              <div className="my-1.5 border-t border-line" />
              <button
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

