# CivicFlow — AI Bureaucracy Navigator

Guides people through government/public-service procedures — not just a link
to a portal, but eligibility, required documents, a personalized roadmap,
document checks, and application tracking, in English and Tamil.

> **Status:** working MVP scaffold. Frontend (Phase 1) is fully built and
> runs against either the live backend or its own local mock data. Backend
> (Phases 2–8) is scaffolded with working auth, routes, and a Postgres
> schema, with the RAG and OCR pipelines stubbed behind clear swap-in
> points — see `backend/src/rag/README.md` and `backend/src/ocr/README.md`.

## 1. Architecture

```
frontend (Vite + React + TS + Tailwind)
        |  HTTPS / JSON
        v
backend (Express)
  /api/auth  /api/services  /api/applications  /api/documents (OCR)  /api/chat (RAG)
        |
        +---> PostgreSQL (users, services, applications, documents, chat)
        +---> OCR provider (Tesseract / cloud OCR)
        +---> LLM + vector DB (RAG pipeline — see backend/src/rag/README.md)
```

The frontend never talks to the LLM, OCR provider, or database directly —
everything goes through the backend API, so API keys and connection
strings stay server-side (see `backend/.env.example`).

## 2. Folder structure

```
ai-bureaucracy-navigator/
├── frontend/                      React + TypeScript + Tailwind (Vite)
│   └── src/
│       ├── pages/                 Landing, Login, Register, Dashboard,
│       │                          AI Assistant, Services, Service Details,
│       │                          Roadmap, Document Scanner, Tracker,
│       │                          Profile, Help
│       ├── components/
│       │   ├── layout/            Sidebar, Header, AppShell
│       │   └── ui/                Card, Badge, Button, ProgressBar
│       ├── context/                Language, Auth, AppData (React context)
│       ├── data/services.ts        Demo government-service knowledge base
│       ├── i18n/translations.ts    EN/TA UI string dictionary
│       ├── lib/mockAssistant.ts    Phase-1 mock RAG reply generator
│       └── types/                  Shared TypeScript types
│
└── backend/                       Node.js + Express + TypeScript
    └── src/
        ├── routes/                 auth, services, applications, documents, chat
        ├── middleware/              requireAuth (JWT), errorHandler
        ├── db/
        │   ├── pool.ts              pg connection pool
        │   └── migrations/001_init.sql   full Postgres schema
        ├── rag/                    README.md (architecture) + classify.ts (Phase-1 mock)
        ├── ocr/                    README.md (architecture) + ocrProvider.ts, fieldSchemas.ts
        ├── data/seedServices.ts     Demo services (mirrors frontend, DB fallback)
        └── types/                   Shared TypeScript types
```

## 3. Database schema

See `backend/src/db/migrations/001_init.sql` for the full DDL. Summary:

| Table               | Purpose                                                        |
|---------------------|------------------------------------------------------------------|
| `users`              | Account + password hash + preferred language                   |
| `gov_services`        | The knowledge base (bilingual name/description/eligibility/steps/fees), `is_demo_data` flag |
| `applications`        | One row per service a user has started, with `current_step_index` and `status` |
| `scanned_documents`    | OCR field-check results — never the raw file bytes             |
| `chat_messages`        | Assistant conversation log, linked to the matched service       |

## 4. API routes

| Method & path                  | Auth | Purpose |
|---------------------------------|------|---------|
| `POST /api/auth/register`        | –    | Create account |
| `POST /api/auth/login`           | –    | Get a JWT |
| `GET  /api/auth/me`              | ✓    | Current user |
| `GET  /api/services`             | –    | List services (optional `?category=`) |
| `GET  /api/services/:id`         | –    | Service detail (eligibility, documents, roadmap) |
| `GET  /api/applications`         | ✓    | List my applications |
| `POST /api/applications`         | ✓    | Start an application for a service |
| `PATCH /api/applications/:id`    | ✓    | Advance step / update status |
| `GET  /api/documents`            | ✓    | List my scanned documents |
| `POST /api/documents/scan`       | ✓    | Upload + OCR field-check a document |
| `DELETE /api/documents/:id`      | ✓    | Delete a scanned document |
| `POST /api/chat`                 | ✓    | Send a message to the AI assistant |

## 5. Data flow (assistant + roadmap)

```
User describes their problem
  -> POST /api/chat
  -> RAG classify (keyword match today, embeddings+LLM later - see rag/README.md)
  -> Matched gov_service returned with reply text
  -> Frontend shows eligibility + documents + "Start Service"
  -> POST /api/applications creates an application row
  -> Frontend renders the roadmap from the matched service's `steps`
  -> PATCH /api/applications/:id as the user completes each step
  -> GET /api/applications powers the Application Tracker timeline
```

## 6. RAG & OCR architecture

Both are documented in depth with concrete swap-in instructions:
- `backend/src/rag/README.md`
- `backend/src/ocr/README.md`

Both currently run in a **mock mode** that needs no API keys, so the full
app is runnable and demoable today. Swapping in a real LLM/vector DB or
OCR provider only touches the files named in those READMEs — no route or
frontend changes required.

## 7. Demo data disclosure

Every fee, processing time, and official URL in `frontend/src/data/services.ts`
and `backend/src/data/seedServices.ts` is a **placeholder**, clearly marked
`isDemoData: true`. Replace with verified official-source content (and cite
the source — see `gov_services.source_url`) before this goes live.

---

## 8. Installation

### Prerequisites
- Node.js 20+
- PostgreSQL 14+ (optional for Phase 1 — the backend falls back to in-memory
  demo data for `/api/services` if the DB isn't reachable)

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### Backend

```bash
cd backend
npm install
cp .env.example .env      # fill in JWT_SECRET at minimum
npm run dev                # http://localhost:4000
```

### Database setup (optional for Phase 1, required from Phase 2 on)

```bash
createdb ai_bureaucracy_navigator
psql "$DATABASE_URL" -f backend/src/db/migrations/001_init.sql
```

### Connecting the AI API (Phase 5)

1. Get an API key from your chosen LLM provider (Gemini or another).
2. Set `LLM_API_KEY` and `LLM_PROVIDER` in `backend/.env`.
3. Implement `backend/src/rag/embed.ts` and `backend/src/rag/llm.ts` per
   `backend/src/rag/README.md`, then point `chat.routes.ts` at them instead
   of the current `classify.ts` mock.

### Deployment

- **Frontend**: `npm run build` in `frontend/` produces a static `dist/`
  folder deployable to any static host (Vercel, Netlify, S3+CloudFront).
- **Backend**: `npm run build` in `backend/` produces `dist/`; run with
  `npm start`. Deploy behind HTTPS (e.g. a managed Node host or a
  container) with `DATABASE_URL`, `JWT_SECRET`, and (once wired up)
  `LLM_API_KEY` / `VECTOR_DB_URL` set as environment secrets — never
  committed, never sent to the frontend.
