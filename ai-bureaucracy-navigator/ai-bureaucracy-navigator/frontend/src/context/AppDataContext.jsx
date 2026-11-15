import { createContext, useContext, useEffect, useState } from 'react'

const AppDataContext = createContext(null)

const APPS_KEY = 'abn_applications'
const DOCS_KEY = 'abn_documents'

function load(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      const cleaned = parsed.filter(
        (item) =>
          item.id !== 'app-pan-demo' &&
          item.id !== 'app-caste-demo' &&
          !item.applicationRef?.startsWith('DEMO-PAN-') &&
          !item.applicationRef?.startsWith('DEMO-CASTE-'),
      )
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(key, JSON.stringify(cleaned))
      }
      return cleaned
    }
    return parsed
  } catch {
    return fallback
  }
}

const seedApplications = []

export function AppDataProvider({ children }) {
  const [applications, setApplications] = useState(() => load(APPS_KEY, seedApplications))
  const [documents, setDocuments] = useState(() => load(DOCS_KEY, []))

  useEffect(() => {
    localStorage.setItem(APPS_KEY, JSON.stringify(applications))
  }, [applications])

  useEffect(() => {
    localStorage.setItem(DOCS_KEY, JSON.stringify(documents))
  }, [documents])

  const startApplication = (serviceId) => {
    const existing = applications.find((a) => a.serviceId === serviceId)
    if (existing) return existing
    const app = {
      id: `app-${serviceId}-${Date.now()}`,
      serviceId,
      applicationRef: `DEMO-${serviceId.toUpperCase()}-${Date.now().toString().slice(-6)}`,
      status: 'documents_pending',
      currentStepIndex: 0,
      dateStarted: new Date().toISOString().slice(0, 10),
      lastUpdated: new Date().toISOString().slice(0, 10),
    }
    setApplications((prev) => [app, ...prev])
    return app
  }

  const advanceApplication = (id, stepIndex, status) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              currentStepIndex: stepIndex,
              status: status ?? a.status,
              lastUpdated: new Date().toISOString().slice(0, 10),
            }
          : a,
      ),
    )
  }

  const addDocument = (doc) => setDocuments((prev) => [doc, ...prev])
  const removeDocument = (id) => setDocuments((prev) => prev.filter((d) => d.id !== id))

  return (
    <AppDataContext.Provider
      value={{ applications, documents, startApplication, advanceApplication, addDocument, removeDocument }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}

