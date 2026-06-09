# Product

## Register

product

> Split-register project: `app/page.tsx` is a brand surface (landing page, acquisition);
> everything under `app/(dashboard)` and the authenticated routes is a product surface.
> Default register is **product**; override to `brand` when working on the landing page.

## Users

Beginner developers, CS/IT students, and bootcamp attendees who are actively learning to code.
Their context: solo study sessions at a desk or laptop, often in the evenings or weekends.
The job: finish a learning session and actually retain what they covered, not just check a box.

## Product Purpose

Commit is infrastructure built around a developer's learning habits, not a content platform.
It doesn't teach: it helps developers learn better while they teach themselves.

The core loop: start a focused session tied to a roadmap milestone, do the work, then answer
one prompt at the end ("What did you learn?"). That answer seeds a spaced-repetition flashcard
and a TIL log. Over time, the user builds a searchable record of their own knowledge.

Success looks like a user who has been coding for three months and can point to exactly what
they know, when they learned it, and how solidly it's stuck.

## Brand Personality

Focused. Confident. Understated.

The voice is a senior developer who doesn't need to convince you — they just show you the
system. No hype, no cheerleading. Concrete verbs. Short sentences that assume competence.

Emotional goal: the user feels like they're building something real, session by session.
Not motivated by streaks or points. Motivated by watching their own knowledge compound.

## Anti-references

- **Codecademy / tutorial-first**: Commit is not a course platform. It has no curriculum,
  no lessons, no "complete this module" UX. Anti-pattern: curriculum cards, lesson trees,
  XP bars, "you've unlocked" copy, guided learning paths imposed from outside.
- **Duolingo-style gamification**: No dopamine loops. No cartoon mascots. No "you're on
  fire!" toasts. Streaks exist as data (productivity heatmap), not as the product.
- **Generic dark SaaS**: Not purple gradients, not glowing neon, not the standard
  dashboard template with sidebar, icon row, and card grid that reads "made by AI."
- **Notion / all-purpose tool**: Not a blank canvas. Commit has strong opinions about
  how learning sessions should be structured. The UI should reflect that confidence.

## Design Principles

1. **Show the compound effect.** Every interaction should make the user feel their
   knowledge building up over time. Visual metaphors for accumulation: heatmaps,
   progress bars, growing logs. Not badges or levels.
2. **Respect the session.** During focus mode, the UI recedes. Before and after,
   it surfaces context. The interface knows when to get out of the way.
3. **Earn the accent.** The mint green (#00FFAA) is used to mark real signal:
   active state, completion, a measurement worth noticing. Never decoration.
4. **Understated confidence.** The copy and layout assume the user is capable.
   No hand-holding prose, no over-explained labels. Dense where density is useful,
   spacious where space is the message.
5. **Data over decoration.** When a section is empty, the empty state is instructive,
   not apologetic. When a section has data, the data is the design.

## Accessibility & Inclusion

- WCAG AA minimum throughout.
- The app is used in low-light environments (evening study); dark theme is primary,
  contrast ratios especially important against dark surfaces.
- Reduced motion support required: all animations must degrade gracefully.
- Monospace font (JetBrains Mono) used for data and code; must remain legible at small sizes.
