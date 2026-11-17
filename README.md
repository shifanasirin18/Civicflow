# CivicFlow — AI Bureaucracy Navigator

> **"From confusion to completion."**  
> CivicFlow is an intelligent civic-tech platform designed to empower citizens by navigating complex Indian government services, eligibility criteria, procedures, required documents, personalized roadmaps, and application tracking — available in **English**, **தமிழ் (Tamil)**, and **हिन्दी (Hindi)**.

---

## 🌟 Key Features

1. **🤖 AI Assistant & Bureaucracy Navigator**:
   - Conversational AI assistant helping citizens pinpoint exact government procedures for their specific life situations.
   - Grounded RAG-style responses citing relevant departments, processing timeframes, fees, and required paperwork.

2. **🏛️ Comprehensive Services Knowledge Base**:
   - Categorized catalog spanning **Identity & Citizenship**, **Welfare & Social Security**, **Revenue & Certificates**, **Healthcare & Ayushman**, **Transport & Driving**, and **Business & MSME**.
   - Direct links to official government portals, eligibility breakdowns, and common procedural pitfalls to avoid.

3. **🎯 Life Events Wizard & Scheme Recommender**:
   - Step-by-step guidance tailored to major life milestones (Starting a Business, Higher Education, Land/Property Registration, Retirement).
   - Targeted welfare scheme discovery filtered by age, location, income level, and social category.

4. **🗺️ Interactive Roadmap & Application Tracker**:
   - Dynamic, step-by-step actionable roadmaps generated for every service started.
   - Real-time application tracking with reference IDs and status stages (*Not Started*, *Documents Pending*, *Submitted*, *In Review*, *Approved / Completed*).

5. **📄 Document Scanner & Readiness Checker**:
   - Pre-submission readiness checks for mandatory documents (Aadhaar Card, PAN Card, Income Certificate, etc.).
   - Multi-format file support (**PDF, JPG, PNG**) with OCR field verification checks for dates, names, ID numbers, and issuing authorities.

6. **🌐 Tri-lingual Accessibility**:
   - Seamless language switching across **English**, **Tamil (தமிழ்)**, and **Hindi (हिन्दी)** for universal civic accessibility.

7. **🇮🇳 Indian Civic Tech Branding & UI**:
   - Official government department emblems and service logos (UIDAI, Income Tax, EPFO, Parivahan, PMJAY, DigiLocker, Passport Seva).
   - Responsive UI featuring dynamic `LogoLoop` marquee banners, pop-up 3D action buttons, and accessible typography.

---

## 🔄 Recent Updates & Architecture Changes

- **Pure JavaScript Migration**: Fully refactored backend and frontend from TypeScript to pure JavaScript (JSX for frontend, ES Modules for backend) for streamlined portability and faster build times.
- **Repository Cleanup**: Removed legacy `scratch_3_module/` and consolidated UI and data components cleanly inside `frontend/src/`.
- **Enhanced Document Scanner**: Added support for PDF uploads, improved OCR field validations, and profile-integrated document status.
- **Added Hindi Support**: Expanded localization dictionary across all primary workflow screens and navigation.

---

## 🛠️ Technology Stack

### **Frontend**
- **Library**: [React 19](https://react.dev/) (`react` 19.2, `react-dom`)
- **Language**: JavaScript (JSX, ES Modules)
- **Tooling & Bundler**: [Vite 8](https://vitejs.dev/) (`@vitejs/plugin-react`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`, `postcss`, `autoprefixer`)
- **Routing**: [React Router v7](https://reactrouter.com/) (`react-router-dom`)
- **Icons**: [Lucide React](https://lucide.dev/) (`lucide-react`)
- **State Management**: React Context (`AuthContext`, `AppDataContext`, `LanguageContext`, `NotificationContext`)
- **Linter**: [Oxlint](https://oxc.rs/)

### **Backend**
- **Runtime**: [Node.js 20+](https://nodejs.org/) (`type: module`)
- **Framework**: [Express 4](https://expressjs.com/)
- **Database**: [PostgreSQL 14+](https://www.postgresql.org/) (`pg` connection pool with in-memory fallback)
- **Security & Auth**: JWT (`jsonwebtoken`), Bcrypt (`bcryptjs`), Helmet, and CORS
- **Validation**: [Zod](https://zod.dev/)
- **File Handling**: [Multer](https://github.com/expressjs/multer)
- **AI / RAG Pipeline**: Modular intent classification and query scoring layer (`backend/src/rag/`)
- **OCR Engine**: Pluggable OCR interface supporting Tesseract.js / cloud vision SDKs (`backend/src/ocr/`)

---

## 📂 Project Structure

```text
Civicflow/
├── README.md
├── .gitattributes
├── ai-bureaucracy-navigator/
│   └── ai-bureaucracy-navigator/
│       ├── frontend/                         # Vite + React 19 + Tailwind CSS Frontend
│       │   ├── src/
│       │   │   ├── components/               # UI components, layout, marquee & logos
│       │   │   │   ├── layout/               # Header, Sidebar, AppShell
│       │   │   │   └── ui/                   # Button, Card, Badge, LogoLoop, CivicFlowLogo
│       │   │   ├── context/                  # Auth, AppData, Language, Notification contexts
│       │   │   ├── data/                     # Government services & life events seed data
│       │   │   ├── i18n/                     # EN, TA, and HI translation dictionaries
│       │   │   ├── pages/                    # Dashboard, Assistant, Services, Scanner, Tracker...
│       │   │   └── types/                    # Runtime schema definitions
│       │   ├── index.html
│       │   ├── vite.config.js                # Vite config with /api proxy to backend
│       │   └── package.json
│       │
│       └── backend/                          # Express + Node.js (ESM) Backend
│           ├── src/
│           │   ├── db/                       # PostgreSQL pool, migrations & seeders
│           │   │   └── migrations/001_init.sql
│           │   ├── middleware/               # requireAuth (JWT), errorHandler, asyncHandler
│           │   ├── ocr/                      # OCR runner, fieldSchemas, document type matchers
│           │   ├── rag/                      # Query classification & knowledge base search
│           │   ├── routes/                   # auth, services, applications, documents, chat
│           │   └── server.js                 # Express server entry point
│           ├── .env.example
│           └── package.json
```

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v20 or higher
- **PostgreSQL**: v14+ *(optional for Phase 1 demo mode; backend automatically falls back to in-memory demo data if DB is unavailable)*

---

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd ai-bureaucracy-navigator/ai-bureaucracy-navigator/backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# (Optional) Run database migrations and seed data
npm run db:migrate
npm run db:seed

# Start the backend server
npm run dev
# -> Server listening on http://localhost:4000
```

---

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd ai-bureaucracy-navigator/ai-bureaucracy-navigator/frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
# -> Local: http://localhost:5173
```

> **Note**: The Vite dev server is pre-configured to proxy `/api` requests directly to `http://localhost:4000`.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new citizen account |
| `POST` | `/api/auth/login` | Public | Login and receive a JWT access token |
| `GET` | `/api/auth/me` | Required | Retrieve current authenticated user profile |
| `GET` | `/api/services` | Public | List all government services (supports `?category=`) |
| `GET` | `/api/services/:id` | Public | Fetch service details, eligibility, roadmap & required docs |
| `GET` | `/api/applications` | Required | List user's active and completed applications |
| `POST` | `/api/applications` | Required | Start a new application for a service |
| `PATCH` | `/api/applications/:id` | Required | Advance progress step or update application status |
| `GET` | `/api/documents` | Required | Retrieve list of scanned documents & quality checks |
| `POST` | `/api/documents/scan` | Required | Upload document (`multipart/form-data`) for OCR verification |
| `DELETE` | `/api/documents/:id` | Required | Remove a scanned document record |
| `POST` | `/api/chat` | Required | Send a message to the AI Assistant for procedural guidance |

---

## 🛡️ License

This project is licensed under the **MIT License**. Built for public benefit and citizen empowerment.
