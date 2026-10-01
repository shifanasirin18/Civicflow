export type Lang = 'en' | 'ta' | 'hi'

export interface Bilingual {
  en: string
  ta: string
  hi?: string
}

export type ServiceCategory =
  | 'identity'
  | 'certificates'
  | 'education'
  | 'employment'
  | 'transport'
  | 'healthcare'
  | 'financial'
  | 'welfare'
  | 'business'
  | 'land'
  | 'tax'

export interface RoadmapStep {
  id: string
  title: Bilingual
  description: Bilingual
}

export interface GovService {
  id: string
  name: Bilingual
  shortName: string
  category: ServiceCategory
  department: Bilingual
  description: Bilingual
  eligibility: Bilingual[]
  documents: Bilingual[]
  steps: RoadmapStep[]
  commonMistakes: Bilingual[]
  officialUrlPlaceholder?: string
  officialUrl: string
  portalName: string
  feeNote: Bilingual
  processingTimeNote: Bilingual
  keywords: string[]
  isDemoData: true
}

export type ApplicationStatus =
  | 'not_started'
  | 'documents_pending'
  | 'submitted'
  | 'in_progress'
  | 'completed'

export interface Application {
  id: string
  serviceId: string
  applicationRef: string
  status: ApplicationStatus
  currentStepIndex: number
  dateStarted: string
  lastUpdated: string
}

export type DocFieldStatus = 'found' | 'missing' | 'low_quality'

export interface DocFieldCheck {
  label: Bilingual
  status: DocFieldStatus
}

export interface ScannedDocument {
  id: string
  fileName: string
  detectedType: string
  uploadedAt: string
  fieldChecks: DocFieldCheck[]
  overallQuality: 'good' | 'needs_rescan'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  serviceCardId?: string
  timestamp: string
}

export interface VerificationItem {
  label: string
  verified: boolean
  docName?: string
  docData?: string
  docSize?: string
  uploadedAt?: string
  docNumber?: string
}

export interface User {
  id: string
  name: string
  email: string
  profileCompletion: number
  verifications: VerificationItem[]
}

