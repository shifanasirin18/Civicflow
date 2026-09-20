import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  Bot,
  Map,
  FileText,
  Grid3x3,
  ClipboardList,
  BookOpen,
  User,
  LogOut,
  HelpCircle,
  HeadphonesIcon,
  Compass,
  Award,
  BookOpenCheck,
  Bell,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationContext'
import { CivicFlowLogo } from '@/components/ui/CivicFlowLogo'

const mainNavItems = [
  { to: '/app', icon: LayoutGrid, key: 'nav_dashboard', end: true },
  { to: '/app/assistant', icon: Bot, key: 'nav_assistant', end: false },
  { to: '/app/roadmap', icon: Map, key: 'nav_roadmap', end: false },
  { to: '/app/documents', icon: FileText, key: 'nav_documents', end: false },
  { to: '/app/notifications', icon: Bell, key: 'nav_notifications', end: false, hasBadge: true },
] as const

const servicesNavItems = [
  { to: '/app/services', icon: Grid3x3, key: 'nav_services', end: false },
  { to: '/app/schemes', icon: Award, key: 'nav_schemes', end: false },
  { to: '/app/life-events', icon: Compass, key: 'nav_life_events', end: false },
  { to: '/app/knowledge', icon: BookOpenCheck, key: 'nav_knowledge', end: false },
  { to: '/app/tracker', icon: ClipboardList, key: 'nav_tracker', end: false },
] as const

export function Sidebar() {
  const { t } = useLanguage()
  const { logout } = useAuth()
  const { unreadCount } = useNotifications()

  return (
    <aside className="sticky top-0 h-screen hidden w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex z-30 overflow-hidden">
      {/* Top Header Logo */}
      <div className="px-5 py-4 border-b border-line/60 shrink-0">
        <NavLink to="/app" className="focus-ring inline-block rounded-xl">
          <CivicFlowLogo size="md" />
        </NavLink>
      </div>

      {/* Middle Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
        {/* Core Navigation */}
        <div className="space-y-0.5">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft/70">
            Navigation
          </p>
          {mainNavItems.map(({ to, icon: Icon, key, end, ...itemProps }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `focus-ring flex items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-ink-soft hover:bg-canvas hover:text-ink'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="shrink-0" />
                <span>{t(key)}</span>
              </div>
              {'hasBadge' in itemProps && unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-bad-500 px-1.5 text-[10px] font-bold text-white shadow-xs">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Services & Tools */}
        <div className="space-y-0.5">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft/70">
            Services &amp; Tools
          </p>
          {servicesNavItems.map(({ to, icon: Icon, key, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-ink-soft hover:bg-canvas hover:text-ink'
                }`
              }
            >
              <Icon size={16} className="shrink-0" />
              <span>{t(key)}</span>
            </NavLink>
          ))}
        </div>

        {/* Account & Help */}
        <div className="space-y-0.5 pt-1">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft/70">
            Account
          </p>
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              `focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-ink-soft hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <User size={16} className="shrink-0" />
            <span>{t('nav_profile')}</span>
          </NavLink>
          <NavLink
            to="/app/help"
            className={({ isActive }) =>
              `focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-ink-soft hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <BookOpen size={16} className="shrink-0" />
            <span>{t('nav_help')}</span>
          </NavLink>
          <button
            onClick={logout}
            className="focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut size={16} className="shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Bottom Support Box */}
      <div className="p-3 border-t border-line/60 bg-surface shrink-0">
        <div className="rounded-xl bg-canvas p-3 border border-line/40 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <HelpCircle size={14} className="text-[#FFAE19]" /> Need help?
          </div>
          <p className="mt-0.5 text-[11px] text-ink-soft leading-tight">
            Talk to our support team.
          </p>
          <button className="focus-ring mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-ink shadow-2xs hover:bg-canvas transition-colors">
            <HeadphonesIcon size={12} /> Contact Support
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
