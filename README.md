## Full-Stack Developer — Adrian Justin J. Salinas

# Commit — The Developer Learning Workspace

> The missing personal workspace for beginner developers and CS/IT students.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk_v6-purple?logo=clerk)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## What is Commit?

Commit is a **cloud-based developer learning workspace** purpose-built for beginner developers and CS/IT students. It does not teach coding — it builds the infrastructure _around_ learning to code: focus management, personal documentation, knowledge retention, and progress visualization, all in one clean environment.

Every Pomodoro session ends with a **Commit Prompt**: _"What did you learn today?"_ This single habit, compounded across weeks, builds a searchable personal knowledge base — something no coding platform offers.

---

## The Problem

| Pain Point             | Reality                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 12.6% completion rate  | Self-paced platforms have median completion rates of just **12.6%** (Jordan, 2015). Learners quit not because it's too hard, but because there's no structure. |
| Tutorial Hell          | Learners complete hundreds of exercises but can't build anything from a blank file.                                                                            |
| No code reviews        | Nobody tells a student their variable names are confusing, their functions too long.                                                                           |
| Bug amnesia            | Beginners fix bugs and forget them. No platform provides a personal error journal.                                                                             |
| No progress visibility | No productivity heatmap, streaks, or session history on any major coding platform.                                                                             |

---

## The Solution: Three Learning Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  FOCUS            DOCUMENT              RETAIN              │
│                                                             │
│  Pomodoro +       Code Journal          Flashcards (SM-2)   │
│  Roadmap Tasks    TIL Daily Log         Concept Mastery     │
│  Distraction      Bug Journal           Productivity        │
│  Dump             Snippet Library       Heatmap             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

| #   | Feature                          | Description                                                                                    |
| --- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | **Pomodoro Focus Timer**         | 25-min sessions with break management, roadmap-linked tasks, and end-of-session Commit Prompt  |
| 2   | **Code Journal**                 | Tiptap rich editor with Markdown support, Shiki syntax highlighting, and PDF / `.md` export    |
| 3   | **Roadmap Tracker**              | Learning paths with milestones, progress bars, pre-built templates, and PDF export             |
| 4   | **Spaced Repetition Flashcards** | SM-2 algorithm scheduling — Again / Hard / Good / Easy review buttons, due-card badge          |
| 5   | **TIL Daily Log**                | Auto-prompted after each Pomodoro session; builds a searchable personal knowledge base         |
| 6   | **Bug & Error Journal**          | Structured error tracking: message → root cause → fix → concept tag                           |
| 7   | **Concept Mastery Tracker**      | 4-level self-assessment: Heard of It → Can Explain → Can Use → Can Teach                      |
| 8   | **Code Snippet Library**         | Personal, tagged, searchable snippet collection (free tier: 50 snippets)                      |
| 9   | **Productivity Heatmap**         | GitHub-style annual contribution heatmap aggregating 6 activity sources, with PNG export       |
| 10  | **Task Manager**                 | Roadmap-linked tasks with completion tracking inside focus sessions                           |
| 11  | **AI Code Explainer**            | Google Gemini with Basic / Advanced / Expert depth toggle (Advanced/Expert requires Pro+)     |
| 12  | **Teams Workspace**              | Shared team environment, member management, owner controls (Teams plan, up to 10 members)     |

---

## Subscription Tiers

| Plan      | Price        | Access                                                            |
| --------- | ------------ | ----------------------------------------------------------------- |
| **Free**  | ₱0           | All 12 tools with limits (50 snippets, 15 milestones, Basic AI)  |
| **Pro**   | ₱899 / mo    | Unlimited everything + Advanced & Expert AI depth                 |
| **Teams** | ₱4,499 / mo  | Pro access + shared team workspace for up to 10 members           |

Payments via **PayMongo** (GCash, Maya, Philippine cards) and **Stripe** (USD, international cards).

---

## Tech Stack

| Layer            | Technology                             | Purpose                                                                    |
| ---------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router + Turbopack)| SSR, Server Actions, API routes, streaming                                 |
| Language         | **TypeScript 5** / React 19            | Type-safe full-stack development                                           |
| Authentication   | **Clerk v6**                           | Sign-up/in, Google OAuth, webhooks (`user.created`, `user.deleted`)        |
| Database         | **Supabase** (PostgreSQL)              | Primary database — self-healing migrations, 14 indexes, paginated queries  |
| ORM              | **Drizzle ORM**                        | Type-safe queries, LEFT JOINs, `COUNT(*)` for tier gates                   |
| Styling          | **Tailwind CSS v4**                    | CSS-variable design tokens + utility classes                               |
| Rich Editor      | **Tiptap v2**                          | Code Journal editor with syntax-highlighted code blocks                    |
| Syntax Highlight | **Shiki v3**                           | VS Code-quality highlighting in rendered journal output                    |
| AI / LLM         | **Google Gemini API**                  | AI Code Explainer with depth toggle; Anthropic SDK available as fallback   |
| PHP Payments     | **PayMongo** (raw fetch)               | GCash, Maya, Philippine credit/debit cards                                 |
| USD Payments     | **Stripe v22**                         | International card payments, subscription management                       |
| Background Jobs  | **Inngest v4**                         | Billing retry queue — 5× retries on activation, 3× on cancel/past-due     |
| State            | **Zustand v5**                         | Pomodoro timer, settings, client-side UI state                             |
| Server Cache     | **TanStack Query v5**                  | Server state caching and revalidation                                      |
| PDF Export       | **jsPDF v4**                           | Client-side PDF export for journal entries and roadmap milestones          |
| Charts           | **Recharts**                           | Dashboard statistics visualization                                         |
| Toasts           | **Sonner v2**                          | Success / error notifications                                              |
| Webhook Verify   | **Svix**                               | Clerk webhook signature verification                                       |
| Deployment       | **Vercel**                             | Edge-optimized global hosting with CI/CD                                   |

---

## Project Structure

```
commit-projectv2/
├── app/
│   ├── (auth)/                   # Clerk sign-in / sign-up pages
│   ├── (dashboard)/              # Protected workspace (requires auth)
│   │   ├── layout.tsx            # Sidebar + TopBar shell; past-due redirect
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── focus/                # Pomodoro Focus Timer
│   │   ├── journal/              # Code Journal (Tiptap, PDF + .md export)
│   │   ├── roadmap/              # Roadmap Tracker (PDF + .md export)
│   │   ├── flashcards/           # SM-2 Spaced Repetition
│   │   ├── til/                  # Today I Learned log
│   │   ├── bugs/                 # Bug & Error Journal
│   │   ├── mastery/              # Concept Mastery Tracker
│   │   ├── snippets/             # Code Snippet Library
│   │   ├── heatmap/              # Productivity Heatmap
│   │   ├── tasks/                # Task Manager
│   │   ├── ai/                   # AI Code Explainer
│   │   ├── team/                 # Teams Workspace (Teams plan only)
│   │   ├── profile/              # User profile
│   │   └── settings/             # Account + Billing settings
│   ├── api/
│   │   ├── chat/                 # AI endpoint (Gemini, rate-limited 20 req/min)
│   │   ├── billing/              # Checkout + portal routes (PayMongo, Stripe)
│   │   ├── inngest/              # Inngest serve handler
│   │   └── webhooks/
│   │       ├── clerk/            # user.created + user.deleted cascade-delete
│   │       ├── stripe/           # Stripe event dispatcher → Inngest
│   │       └── paymongo/         # PayMongo event dispatcher → Inngest
│   ├── actions/
│   │   └── crud.ts               # All Server Actions (paginated, indexed, plan-gated)
│   └── page.tsx                  # Public landing page
│
├── components/
│   ├── layout/                   # Sidebar, TopBar, SyncQueueProvider
│   ├── focus/                    # PomodoroTimer, CommitModal, DistractionDump
│   ├── billing/                  # PlanBadge, UpgradePrompt, BillingTab
│   ├── onboarding/               # 5-step onboarding flow
│   └── ...                       # Feature-specific components per route
│
├── lib/
│   ├── billing/
│   │   └── subscriptions.ts      # activateSubscription, cancelSubscription, handlePastDue
│   ├── inngest.ts                # Inngest client
│   ├── inngest/
│   │   └── functions.ts          # 3 billing functions with step.run() and retries
│   ├── plans.ts                  # getUserPlan(), isPro(), isTeams()
│   └── rate-limit.ts             # In-memory sliding window rate limiter
│
├── db/
│   ├── schema.ts                 # All Drizzle table definitions
│   └── index.ts                  # DB connection (postgres + drizzle)
│
├── middleware.ts                  # clerkMiddleware — protects /dashboard routes
├── .env.example                   # All required env vars with inline docs
└── PROGRESS_REPORT.html           # Internal build progress audit
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Clerk](https://clerk.com) application
- A [Google AI Studio](https://aistudio.google.com/app/apikey) API key (Gemini)
- PayMongo + Stripe accounts for billing (optional for local dev)

### 1. Clone & Install

```bash
git clone https://github.com/JustineSalinas/Commit-Project-Web-App.git
cd Commit-Project-Web-App
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
CLERK_WEBHOOK_SECRET=whsec_...

# Database (Supabase — use Transaction Pooler connection string)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# AI
GEMINI_API_KEY=AIzaSy...

# Payments (optional for local dev)
PAYMONGO_SECRET_KEY=sk_test_...
PAYMONGO_WEBHOOK_SECRET=whsk_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Inngest (no keys needed in dev — just run the CLI)
INNGEST_SIGNING_KEY=signkey-prod-...
INNGEST_EVENT_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Development

```bash
# Terminal 1 — Next.js dev server
npm run dev

# Terminal 2 — Inngest dev server (for billing background jobs)
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Database migrations run automatically** on first request via a self-healing singleton — no `drizzle-kit push` needed in production.

### 4. Clerk Webhook Setup

In Clerk Dashboard → Webhooks, create an endpoint pointing to `/api/webhooks/clerk` and subscribe to:
- `user.created`
- `user.deleted`

### 5. Stripe Local Testing

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Design System

Commit uses a **Deep Dark Obsidian** design language inspired by premium developer tools.

| Token        | Value       | Usage                             |
| ------------ | ----------- | --------------------------------- |
| Background   | `#09090B`   | Page and panel backgrounds        |
| Surface      | `#111113`   | Card and container surfaces       |
| Border       | `#1A1A1F`   | Subtle element borders            |
| Accent       | `#00FFAA`   | Primary actions, active states    |
| Accent Muted | `#00FFAA1A` | Accent backgrounds, badges        |
| Text Primary | `#FAFAFA`   | Headings and primary text         |
| Text Muted   | `#71717A`   | Secondary text, captions          |
| Danger       | `#FF4757`   | Error states, destructive actions |
| Warning      | `#FFB347`   | Warnings, streak alerts           |

Fonts: **Bricolage Grotesque** (headings/UI) + **JetBrains Mono** (code), both via `next/font/google`.

---

## Scalability

| Users          | Status       | Notes                                                                               |
| -------------- | ------------ | ----------------------------------------------------------------------------------- |
| 0 – 1,000      | ✅ Fine       | Supabase free tier handles this with ease                                           |
| 1,000 – 10,000 | ✅ Fine       | 14 DB indexes + 100-row pagination eliminate full-table scan overhead               |
| 10,000 – 50,000 | ✅ Fine      | Inngest retry queue, rate-limited AI, React.cache() billing deduplication           |
| 50,000 – 100,000 | ⚠ Config   | Upgrade Supabase to Pro ($25/mo) for pgBouncer connection pool beyond 25 connections |

---

<p align="center">Built for developers who take their learning seriously.</p>
<p align="center">CDG Philippines &nbsp;·&nbsp; <a href="mailto:cdg.solutionsph@gmail.com">cdg.solutionsph@gmail.com</a></p>
