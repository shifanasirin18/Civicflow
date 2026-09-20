import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import { AuthProvider } from '@/context/AuthContext'
import { AppDataProvider } from '@/context/AppDataContext'
import { NotificationProvider } from '@/context/NotificationContext'
import { AppShell } from '@/components/layout/AppShell'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { AIAssistantPage } from '@/pages/AIAssistantPage'
import { GovernmentServicesPage } from '@/pages/GovernmentServicesPage'
import { ServiceDetailsPage } from '@/pages/ServiceDetailsPage'
import { RoadmapPage } from '@/pages/RoadmapPage'
import { DocumentScannerPage } from '@/pages/DocumentScannerPage'
import { ApplicationTrackerPage } from '@/pages/ApplicationTrackerPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { HelpPage } from '@/pages/HelpPage'
import { LifeEventsPage } from '@/pages/LifeEventsPage'
import { SchemesPage } from '@/pages/SchemesPage'
import { KnowledgeHubPage } from '@/pages/KnowledgeHubPage'
import { NotificationsPage } from '@/pages/NotificationsPage'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppDataProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/app" element={<AppShell />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="assistant" element={<AIAssistantPage />} />
                  <Route path="life-events" element={<LifeEventsPage />} />
                  <Route path="schemes" element={<SchemesPage />} />
                  <Route path="knowledge" element={<KnowledgeHubPage />} />
                  <Route path="services" element={<GovernmentServicesPage />} />
                  <Route path="services/:serviceId" element={<ServiceDetailsPage />} />
                  <Route path="roadmap" element={<RoadmapPage />} />
                  <Route path="documents" element={<DocumentScannerPage />} />
                  <Route path="tracker" element={<ApplicationTrackerPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="help" element={<HelpPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </AppDataProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
