## Full-Stack Developer - Adrian Justin J. Salinas

# Commit — The Developer Learning Workspace

> The missing personal workspace for beginner developers and CS/IT students.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-purple?logo=clerk)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan?logo=tailwindcss)](https://tailwindcss.com/)
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
│  FOCUS           DOCUMENT             RETAIN                │
│                                                             │
│  Pomodoro +      Code Journal         Flashcards (SM-2)     │
│  Roadmap Tasks   TIL Daily Log        Concept Mastery       │
│  Distraction     Bug Journal          Productivity Heatmap  │
│  Dump            Snippet Library                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

| #   | Feature                          | Description                                                                                |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | **Pomodoro Focus Timer**         | 25-min sessions with break management, roadmap-linked tasks, and session counters          |
| 2   | **Code Journal**                 | Split-pane Markdown editor with live preview, Shiki syntax highlighting, milestone linking |
| 3   | **Distraction & Bug Dump**       | Floating side panel to capture interrupting thoughts without breaking focus                |
| 4   | **Productivity Heatmap**         | GitHub-style annual contribution heatmap with streaks, hover tooltips, and PNG export      |
| 5   | **Roadmap Tracker**              | Structured learning paths with milestones, progress bars, and pre-built templates          |
| 6   | **Spaced Repetition Flashcards** | SM-2 algorithm scheduling built from journal notes and TIL logs                            |
| 7   | **TIL Daily Log**                | Auto-prompted after each Pomodoro session, searchable knowledge base                       |
| 8   | **Bug & Error Journal**          | Structured error tracking: message → root cause → fix → concept tag                        |
| 9   | **Concept Mastery Tracker**      | 4-level self-assessment: Heard of It → Can Explain → Can Use → Can Teach                   |
| 10  | **Code Snippet Library**         | Personal, searchable, tagged snippet collection built from journal sessions                |
| 11  | **AI Code Explainer**            | Anthropic Claude API, roadmap-aware explanations with "Simpler/Deeper" controls            |

---

## Tech Stack

| Layer            | Technology                    | Purpose                                              |
| ---------------- | ----------------------------- | ---------------------------------------------------- |
| Framework        | **Next.js 15** (App Router)   | Full-stack React with server components & API routes |
| Language         | **TypeScript 5**              | Type-safe development across frontend and backend    |
| Authentication   | **Clerk**                     | User accounts, Google/GitHub OAuth                   |
| Database         | **Supabase** (PostgreSQL)     | Primary cloud database with RLS per user             |
| ORM              | **Drizzle ORM**               | Type-safe, lightweight query layer                   |
| Real-time        | **Supabase Realtime**         | Live syncing of entries and session state            |
| AI / LLM         | **Anthropic Claude API**      | Context-aware AI Code Explainer (Claude Sonnet)      |
| Rich Editor      | **Tiptap**                    | Markdown + syntax-highlighted code editing           |
| Syntax Highlight | **Shiki**                     | VS Code-quality code highlighting                    |
| Styling          | **Tailwind CSS + shadcn/ui**  | Utility-first CSS with accessible components         |
| State / Cache    | **Zustand + TanStack Query**  | Client state & server data caching                   |
| Background Jobs  | **Inngest**                   | SM-2 spaced repetition scheduling                    |
| File Storage     | **Supabase Storage**          | Heatmap PNG exports & attachment uploads             |
| Deployment       | **Vercel (Pro)**              | Edge-optimized global hosting with CI/CD             |
| Monitoring       | **Sentry + Vercel Analytics** | Error tracking and performance monitoring            |

---

## Project Structure

```
commit-projectv2/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Authentication routes (Clerk)
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/              # Protected workspace routes
│   │   ├── layout.tsx            # Dashboard shell with sidebar
│   │   ├── page.tsx              # Main dashboard / overview
│   │   ├── focus/                # Pomodoro Focus Timer
│   │   ├── journal/              # Code Journal (Tiptap editor)
│   │   ├── roadmap/              # Roadmap Tracker
│   │   ├── flashcards/           # Spaced Repetition Flashcards
│   │   ├── til/                  # Today I Learned Daily Log
│   │   ├── bugs/                 # Bug & Error Journal
│   │   ├── mastery/              # Concept Mastery Tracker
│   │   ├── snippets/             # Code Snippet Library
│   │   ├── heatmap/              # Productivity Heatmap
│   │   └── ai/                   # AI Code Explainer
│   ├── api/                      # API Route Handlers
│   │   ├── ai/                   # Claude AI explainer endpoint
│   │   ├── flashcards/           # SM-2 scheduling & review
│   │   ├── heatmap/              # Session data aggregation
│   │   ├── inngest/              # Inngest background job handler
│   │   ├── journal/              # Journal CRUD operations
│   │   ├── pomodoro/             # Session tracking & stats
│   │   ├── roadmap/              # Roadmap & milestone management
│   │   ├── snippets/             # Snippet library CRUD
│   │   ├── til/                  # TIL log operations
│   │   └── bugs/                 # Bug journal CRUD
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout (fonts, providers)
│   └── not-found.tsx             # Custom 404 page
│
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui base components
│   ├── layout/                   # Layout-level components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileNav.tsx
│   ├── focus/                    # Pomodoro Timer components
│   │   ├── PomodoroTimer.tsx
│   │   ├── SessionCounter.tsx
│   │   ├── DistractionDump.tsx
│   │   └── TimerControls.tsx
│   ├── journal/                  # Code Journal components
│   │   ├── JournalEditor.tsx     # Tiptap rich editor
│   │   ├── JournalPreview.tsx    # Rendered markdown preview
│   │   ├── JournalEntry.tsx
│   │   └── EntryList.tsx
│   ├── roadmap/                  # Roadmap components
│   │   ├── RoadmapBoard.tsx
│   │   ├── MilestoneCard.tsx
│   │   ├── MilestoneDetail.tsx
│   │   ├── ProgressBar.tsx
│   │   └── TemplateSelector.tsx
│   ├── flashcards/               # Spaced Repetition components
│   │   ├── FlashcardDeck.tsx
│   │   ├── FlashcardReview.tsx
│   │   ├── FlashcardCreator.tsx
│   │   └── DueCardBadge.tsx
│   ├── til/                      # TIL components
│   │   ├── TILPrompt.tsx
│   │   ├── TILEntry.tsx
│   │   └── TILFeed.tsx
│   ├── bugs/                     # Bug Journal components
│   │   ├── BugForm.tsx
│   │   ├── BugEntry.tsx
│   │   └── BugList.tsx
│   ├── mastery/                  # Concept Mastery components
│   │   ├── MasteryCard.tsx
│   │   ├── MasteryLevel.tsx
│   │   └── MasteryDashboard.tsx
│   ├── snippets/                 # Snippet Library components
│   │   ├── SnippetCard.tsx
│   │   ├── SnippetEditor.tsx
│   │   └── SnippetSearch.tsx
│   ├── heatmap/                  # Productivity Heatmap components
│   │   ├── ActivityHeatmap.tsx
│   │   ├── HeatmapTooltip.tsx
│   │   ├── StreakCounter.tsx
│   │   └── WeeklySummary.tsx
│   ├── ai/                       # AI Code Explainer components
│   │   ├── AIExplainer.tsx
│   │   ├── AIChat.tsx
│   │   └── DepthControls.tsx
│   └── dashboard/                # Dashboard overview components
│       ├── DashboardHeader.tsx
│       ├── QuickStats.tsx
│       ├── TodaySchedule.tsx
│       └── RecentActivity.tsx
│
├── lib/                          # Utilities & service clients
│   ├── supabase/                 # Supabase client setup
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client (RSC/API)
│   │   └── middleware.ts         # Auth middleware helper
│   ├── drizzle/                  # Drizzle ORM setup
│   │   ├── schema/               # Database schema definitions
│   │   │   ├── index.ts
│   │   │   ├── users.ts
│   │   │   ├── journal.ts
│   │   │   ├── roadmap.ts
│   │   │   ├── flashcards.ts
│   │   │   ├── til.ts
│   │   │   ├── bugs.ts
│   │   │   ├── snippets.ts
│   │   │   ├── mastery.ts
│   │   │   └── sessions.ts
│   │   ├── migrations/           # Auto-generated SQL migrations
│   │   └── db.ts                 # DB connection instance
│   ├── ai/                       # Anthropic Claude integration
│   │   ├── client.ts
│   │   └── prompts.ts
│   ├── inngest/                  # Background job functions
│   │   ├── client.ts
│   │   ├── sm2.ts                # SM-2 algorithm implementation
│   │   └── notifications.ts
│   ├── zustand/                  # Global client state stores
│   │   ├── pomodoroStore.ts
│   │   ├── journalStore.ts
│   │   └── uiStore.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── usePomodoro.ts
│   │   ├── useFlashcards.ts
│   │   ├── useRoadmap.ts
│   │   ├── useJournal.ts
│   │   └── useHeatmap.ts
│   └── utils.ts                  # Shared utility functions
│
├── types/                        # Global TypeScript types
│   ├── database.ts               # Drizzle-inferred DB types
│   ├── api.ts                    # API request/response types
│   └── index.ts                  # Re-exports
│
├── middleware.ts                  # Next.js middleware (Clerk auth)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── drizzle.config.ts             # Drizzle ORM configuration
├── components.json               # shadcn/ui configuration
├── .env.local                    # Local environment variables
├── .env.example                  # Environment variable template
├── package.json
├── tsconfig.json
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application
- An [Anthropic](https://anthropic.com) API key
- An [Inngest](https://inngest.com) account

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/commit-projectv2.git
cd commit-projectv2
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Drizzle
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# Inngest
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Database Migrations

```bash
npx drizzle-kit push
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Design System

Commit uses a **Deep Dark Obsidian** design language inspired by premium developer tools:

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

---

<p align="center">Built for developers who take their learning seriously.</p>
