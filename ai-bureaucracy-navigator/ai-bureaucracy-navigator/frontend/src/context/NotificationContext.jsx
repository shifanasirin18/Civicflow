import { createContext, useContext, useEffect, useState } from 'react'

const NotificationContext = createContext(null)

const NOTIFICATIONS_STORAGE_KEY = 'civicflow_notifications_v1'

const seedNotifications = [
  {
    id: 'notif-1',
    title: 'PAN Card Application Active',
    message: 'Your application roadmap has been initialized. Complete the required document check before final submission.',
    category: 'application',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: false,
    link: '/app/tracker',
    priority: 'high',
    actionLabel: 'Track Status',
  },
  {
    id: 'notif-2',
    title: 'Document Quality Check Passed',
    message: 'Aadhaar Card copy was verified with 98% clarity. Ready for official portal upload.',
    category: 'document',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    link: '/app/documents',
    priority: 'medium',
    actionLabel: 'View Documents',
  },
  {
    id: 'notif-3',
    title: 'New Scheme Matched for You',
    message: 'Based on your profile, you may be eligible for the PM SVANidhi Credit Support Scheme.',
    category: 'scheme',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: false,
    link: '/app/schemes',
    priority: 'medium',
    actionLabel: 'Explore Scheme',
  },
  {
    id: 'notif-4',
    title: 'Patta Chitta Verification Reminder',
    message: 'Remember to verify your survey number on the Tamil Nadu AnyROR portal before applying.',
    category: 'application',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
    link: '/app/services/tn-patta-chitta',
    priority: 'low',
    actionLabel: 'View Service',
  },
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    if (!raw) return seedNotifications
    try {
      return JSON.parse(raw)
    } catch {
      return seedNotifications
    }
  })

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const addNotification = (item) => {
    const newNotif = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotif, ...prev])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}

