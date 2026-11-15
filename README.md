# CivicFlow — AI Bureaucracy Navigator

> **"From confusion to completion."**
> CivicFlow is an intelligent civic tech platform that guides citizens through complex government services, procedures, eligibility requirements, personalized roadmaps, document readiness checks, and application tracking in English and Tamil.

---

## 🌟 Key Features

1. **AI Assistant & Guidance**:
   - Interactive conversational assistant to identify citizen goals and match relevant government services.
   - Grounded RAG-style responses citing official government departments, estimated processing times, and fees.

2. **Government Knowledge Base**:
   - Categorized services catalog across Identity, Business, Welfare, Certificates, Healthcare, Education, Transport, and more.
   - Comprehensive eligibility criteria, required documents, common mistakes, and direct links to official government portals.

3. **Life Events Wizard & Scheme Recommender**:
   - Step-by-step wizard tailored to major life milestones (starting a business, higher education, retirement, property purchase).
   - Personalized welfare scheme discovery based on location, age, occupation, and household criteria.

4. **Interactive Roadmap & Application Tracker**:
   - Dynamic step-by-step execution timeline for every started application.
   - Persistent progress tracking with reference numbers and status updates (*Not Started*, *Documents Pending*, *Submitted*, *Processing*, *Completed*).

5. **Document Scanner & Readiness Checker**:
   - Upload and verify mandatory document readiness before submitting applications.
   - Simulated/pluggable OCR quality and field verification checks (Aadhaar, PAN, Income Certificate, etc.).

---

## 🛠️ Architecture & Tech Stack

```text
CivicFlow/
├── frontend/                     React 19 + JavaScript (JSX) + Vite + Tailwind CSS v4 + Lucide Icons
│   ├── src/pages/                Landing, Assistant, Services, Roadmaps, Tracker, Scanner, etc.
│   ├── src/components/           LifeEventWizard, SchemeRecommender, KnowledgeHub, UI Kit
│   ├── src/context/              AuthContext, LanguageContext (EN/TA/HI), AppDataContext
│   └── src/i18n/                 Multi-lingual dictionary (English, Tamil, Hindi)
│
└── backend/                      Node.js + Express + JavaScript (ES Modules) + PostgreSQL
    ├── src/routes/               /api/auth, /api/services, /api/applications, /api/documents, /api/chat
    ├── src/db/                   PostgreSQL connection pool, migrations (001_init.sql), seed data
    ├── src/rag/                  Intent classification & query scoring engine
    └── src/ocr/                  Document field verification & OCR provider abstraction
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v20+
- **PostgreSQL**: v14+ (optional for frontend demo mode; required for full backend persistence)

### 2. Backend Setup
```bash
cd ai-bureaucracy-navigator/ai-bureaucracy-navigator/backend
npm install
npm run db:migrate    # Runs PostgreSQL DDL schema
npm run db:seed       # Seeds 12 government services
npm run dev           # Starts API server on http://localhost:4000
```

### 3. Frontend Setup
```bash
cd ai-bureaucracy-navigator/ai-bureaucracy-navigator/frontend
npm install
npm run dev           # Starts Vite dev server on http://localhost:5173
```

---

## 🛡️ License
MIT License. Built for public benefit and citizen empowerment.
