commit-projectv2/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── focus/
│   │   │   └── page.tsx
│   │   ├── journal/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── roadmap/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── flashcards/
│   │   │   ├── page.tsx
│   │   │   └── [deckId]/
│   │   │       └── page.tsx
│   │   ├── til/
│   │   │   └── page.tsx
│   │   ├── bugs/
│   │   │   └── page.tsx
│   │   ├── mastery/
│   │   │   └── page.tsx
│   │   ├── snippets/
│   │   │   └── page.tsx
│   │   ├── heatmap/
│   │   │   └── page.tsx
│   │   └── ai/
│   │       └── page.tsx
│   ├── api/
│   │   ├── ai/
│   │   │   └── explain/
│   │   │       └── route.ts
│   │   ├── flashcards/
│   │   │   ├── route.ts
│   │   │   └── review/
│   │   │       └── route.ts
│   │   ├── heatmap/
│   │   │   └── route.ts
│   │   ├── inngest/
│   │   │   └── route.ts
│   │   ├── journal/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── pomodoro/
│   │   │   ├── route.ts
│   │   │   └── stats/
│   │   │       └── route.ts
│   │   ├── roadmap/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── milestones/
│   │   │           └── route.ts
│   │   ├── snippets/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── til/
│   │   │   └── route.ts
│   │   ├── bugs/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                          # shadcn/ui auto-generated components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileNav.tsx
│   ├── focus/
│   │   ├── PomodoroTimer.tsx
│   │   ├── SessionCounter.tsx
│   │   ├── DistractionDump.tsx
│   │   └── TimerControls.tsx
│   ├── journal/
│   │   ├── JournalEditor.tsx
│   │   ├── JournalPreview.tsx
│   │   ├── JournalEntry.tsx
│   │   └── EntryList.tsx
│   ├── roadmap/
│   │   ├── RoadmapBoard.tsx
│   │   ├── MilestoneCard.tsx
│   │   ├── MilestoneDetail.tsx
│   │   ├── ProgressBar.tsx
│   │   └── TemplateSelector.tsx
│   ├── flashcards/
│   │   ├── FlashcardDeck.tsx
│   │   ├── FlashcardReview.tsx
│   │   ├── FlashcardCreator.tsx
│   │   └── DueCardBadge.tsx
│   ├── til/
│   │   ├── TILPrompt.tsx
│   │   ├── TILEntry.tsx
│   │   └── TILFeed.tsx
│   ├── bugs/
│   │   ├── BugForm.tsx
│   │   ├── BugEntry.tsx
│   │   └── BugList.tsx
│   ├── mastery/
│   │   ├── MasteryCard.tsx
│   │   ├── MasteryLevel.tsx
│   │   └── MasteryDashboard.tsx
│   ├── snippets/
│   │   ├── SnippetCard.tsx
│   │   ├── SnippetEditor.tsx
│   │   └── SnippetSearch.tsx
│   ├── heatmap/
│   │   ├── ActivityHeatmap.tsx
│   │   ├── HeatmapTooltip.tsx
│   │   ├── StreakCounter.tsx
│   │   └── WeeklySummary.tsx
│   ├── ai/
│   │   ├── AIExplainer.tsx
│   │   ├── AIChat.tsx
│   │   └── DepthControls.tsx
│   └── dashboard/
│       ├── DashboardHeader.tsx
│       ├── QuickStats.tsx
│       ├── TodaySchedule.tsx
│       └── RecentActivity.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── drizzle/
│   │   ├── schema/
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
│   │   ├── migrations/
│   │   └── db.ts
│   ├── ai/
│   │   ├── client.ts
│   │   └── prompts.ts
│   ├── inngest/
│   │   ├── client.ts
│   │   ├── sm2.ts
│   │   └── notifications.ts
│   ├── zustand/
│   │   ├── pomodoroStore.ts
│   │   ├── journalStore.ts
│   │   └── uiStore.ts
│   ├── hooks/
│   │   ├── usePomodoro.ts
│   │   ├── useFlashcards.ts
│   │   ├── useRoadmap.ts
│   │   ├── useJournal.ts
│   │   └── useHeatmap.ts
│   └── utils.ts
├── types/
│   ├── database.ts
│   ├── api.ts
│   └── index.ts
├── docs/
│   └── assets/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── components.json
├── .env.example
├── .env.local           # (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
