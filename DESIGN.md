---
name: Commit
description: The developer learning workspace — structured focus, spaced repetition, compounding knowledge.
colors:
  bg-base: "#09090B"
  bg-surface: "#111113"
  bg-elevated: "#18181B"
  border: "#1A1A1F"
  border-muted: "#27272A"
  accent: "#00FFAA"
  accent-hover: "#00E599"
  text-primary: "#FAFAFA"
  text-secondary: "#A1A1AA"
  text-muted: "#71717A"
  danger: "#FF4757"
  warning: "#FFB347"
  info: "#60A5FA"
  success: "#4ADE80"
typography:
  display:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  section: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#000000"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
  card-bento:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-pricing:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "28px"
  card-pricing-highlighted:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: Commit

## 1. Overview

**Creative North Star: "The Architect's Sketchbook"**

Commit's visual language is built on restraint and precision. The surface is near-void — dark
enough that the UI disappears, leaving only the data. Generous negative space acts as structure;
the borders and dividers are the grid. Nothing is decorative. Every component earns its presence
by carrying signal the user needs right now.

The mint accent (#00FFAA) is not a brand color in the conventional sense. It is a measurement
instrument. It marks what is live, what is active, what has been completed. Its rarity on any
given screen is precisely what makes it meaningful. On a screen with forty UI elements, the
accent touches four. The eye goes there first.

The typography pairing is confidence at two registers: Space Grotesk for headings that state
things without equivocation, JetBrains Mono for data, labels, and technical copy. The two fonts
never fight. They divide responsibility cleanly. Headlines claim space; monospace fills it with
specifics.

This system explicitly rejects curriculum-driven UI patterns (progress bars tied to unlocking
content, lesson cards, XP meters), gamification chrome (streak-as-product, toast celebrations,
mascots), and generic dark SaaS aesthetics (purple/blue gradients, glowing neon outlines,
glassmorphism as decoration). The anti-reference is any interface that performs "tool" without
having the confidence to actually be one.

**Key Characteristics:**
- Near-void dark ground with tonal layering (three surface levels, no shadows)
- Mint accent used sparingly: active state, completion, key measurements only
- Monospace for all data, metrics, labels, and timestamps
- Typography hierarchy built on weight and size contrast, not color
- Borders as structural dividers, not decoration

## 2. Colors: The Signal Palette

A near-void dark ground with one precision instrument in mint. Every other surface level is a
tone of darkness; the accent is the only hue that carries intent.

### Primary
- **Precision Mint** (#00FFAA): The signal color. Applied to active states, completion markers,
  key metrics, heatmap peaks, the progress indicator, and the primary CTA. Appears on ≤15% of
  any given screen at full opacity. Muted variant at 10% opacity for backgrounds behind accent
  content.

### Neutral
- **Void** (#09090B): Page background. The darkest level. Not pure black; has a faint warm cast
  that avoids the harshness of #000 on screen.
- **Surface** (#111113): Card and section backgrounds. The primary canvas for UI components.
- **Elevated** (#18181B): Hover states, inner card backgrounds, secondary containers. Creates
  depth without shadows.
- **Structural Border** (#1A1A1F): Dividers, card edges, section separators. Barely visible;
  provides spatial grammar without visual noise.
- **Muted Border** (#27272A): Active borders, focused inputs, hover-state card edges.
- **Primary Text** (#FAFAFA): Body copy, headings, important labels. Near-white; not pure white.
- **Secondary Text** (#A1A1AA): Supporting text, descriptions, secondary labels.
- **Muted Text** (#71717A): Timestamps, monospace metadata, placeholder copy, tertiary labels.

### Semantic
- **Alert** (#FF4757): Destructive actions, error states.
- **Caution** (#FFB347): Warnings, time-sensitive prompts.
- **Reference** (#60A5FA): Informational states, links.
- **Resolved** (#4ADE80): Success states, completed items (not the same as the Precision Mint
  completion marker — this is for explicit "done" confirmations).

### Named Rules

**The Rarity Rule.** Precision Mint at full opacity is permitted only when it carries active or
completion state, a live measurement, or the single primary CTA per view. If more than three
elements on a screen show full-opacity mint, at least one of them is wrong.

**The Tonal Depth Rule.** Depth is expressed through the three surface levels (bg-base →
bg-surface → bg-elevated). No box shadows. No blur layers. No glassmorphism. Elevation is purely
tonal.

## 3. Typography

**Display Font:** Space Grotesk (sans-serif)
**Data / Label Font:** JetBrains Mono (monospace)

**Character:** Space Grotesk is geometric but not cold. Its slightly rounded terminals read as
confident rather than clinical. Paired with JetBrains Mono, which is built for code legibility
at small sizes, the combination places the product at the intersection of crafted tool and sharp
editorial.

### Hierarchy
- **Display** (700, clamp(2.5rem → 5rem), line-height 0.95, tracking -0.03em): The page-level
  headline. Landing page hero and section openers only. Never inside components.
- **Headline** (700, clamp(1.75rem → 3.25rem), line-height 1.05, tracking -0.025em): Section
  headings and major UI titles. One per section or screen region.
- **Title** (600, 1.25rem, line-height 1.3, tracking -0.01em): Component headings, card titles,
  modal titles. The workhorse mid-level label.
- **Body** (400, 1rem, line-height 1.65): All prose, descriptions, FAQ answers, feature copy.
  Cap line length at 65ch. Never in monospace.
- **Label** (JetBrains Mono 400, 0.6875rem, tracking 0.1em, uppercase): Section kickers,
  metadata, timestamps, status badges, data values. Monospace only. Used sparingly: one label
  per section, not a heading on every component.

### Named Rules

**The Two Registers Rule.** Space Grotesk for meaning; JetBrains Mono for measurement. Never
swap them. A heading in monospace reads as broken. A data label in a display font reads as
decoration.

**The Label Scarcity Rule.** Monospace uppercase labels (kickers, eyebrows) are permitted once
per section as orientation. A monospace label on every card is noise, not system.

## 4. Elevation

Commit uses **tonal layering**, not shadows. The three surface levels (bg-base, bg-surface,
bg-elevated) create the full depth range. This is a deliberate choice: shadows add ambience and
warmth that conflicts with the instrument-panel philosophy. Flat tonal surfaces feel precise.
Shadows feel decorative.

The one exception is the hero dashboard mock, which uses a heavy `shadow-2xl shadow-black/50`
to physically separate it from the page — a structural shadow, not an aesthetic one.

### Named Rules

**The No Ambient Shadow Rule.** Box shadows are prohibited except to physically separate a
floating element (modal, popover, the hero mock card) from the page. No ambient glow shadows
under buttons. No diffuse outer glows. If a shadow is tempting, use bg-elevated instead.

## 5. Components

### Buttons

Buttons in Commit are decisive. No ambiguity about what will happen.

- **Shape:** Gently rounded (12px / rounded-xl). Not a pill; not square.
- **Primary:** Precision Mint (#00FFAA) background, pure black text, 700 weight. Padding 14px
  vertical, 28px horizontal. Hover shifts to accent-hover (#00E599). Active state scales to
  0.97. Transition 150ms.
- **Ghost:** Transparent with structural border (1px #1A1A1F). Text secondary (#A1A1AA). Hover
  shifts border to border-muted (#27272A) and text to primary (#FAFAFA). The hover-fill class
  adds a subtle directional sweep (rgba(255,255,255,0.06)) from the entry side.
- **CTAs:** Verb + object. "Start for free" not "Get started". "Start Pro" not "Upgrade now".
  The label states what will happen next, not what the user should feel.

### Cards / Bento Containers

- **Corner Style:** 16px radius (rounded-2xl). Consistent across all card surfaces.
- **Background:** bg-surface (#111113) at rest.
- **Hover:** Border shifts from structural (#1A1A1F) to muted (#27272A). No background change,
  no lift, no shadow.
- **Spotlight Effect:** On mousemove, a radial gradient spotlight (260px, 7% opacity mint)
  tracks the cursor via `--sx`/`--sy` CSS properties. Subtle; reveals depth without decoration.
- **Internal Padding:** 24px (bento grid), 28px (pricing cards).
- **Border:** 1px structural border, always present. Never removed on hover.

### Inputs / Fields

- **Style:** 1px structural border on transparent background. Rounded-lg (8px).
- **Focus:** Border shifts to border-muted (#27272A). No glow rings. No color fill.
- **Error:** Danger red (#FF4757) border. Inline error message in danger color below field,
  font-mono, 11px.
- **Placeholder:** Muted text (#71717A). Must meet 4.5:1 against bg-surface.

### Navigation (Sticky Header)

- **Default:** Transparent background. Logo in Precision Mint, Space Grotesk, bold, wide-tracked.
- **Scrolled:** rgba(9,9,11,0.85) backdrop-blur-xl, 1px structural bottom border. Transition 300ms.
- **Nav links:** 14px, text-secondary, hover text-primary. No underlines. No active indicators.
- **Mobile:** Full-width dropdown from bg-surface with structural bottom border.

### Productivity Heatmap (Signature Component)

The heatmap is the most data-dense element in the system. Five intensity levels from the void
to full Precision Mint at 92% opacity. The gradient is perceptual: 0% (void), 15%, 38%, 62%,
92%. No full 100% opacity — even at maximum the color reads as part of the data, not a flag.

### Flashcard (Signature Component)

3D CSS flip on click. Front: structural border, bg-elevated, monospace kicker "QUESTION",
body text in Space Grotesk 14px. Back: accent/30 border, same bg-elevated, mint kicker
"ANSWER", monospace answer in 700 weight. SM-2 rating buttons (Again / Hard / Good / Easy) in
a row; Good is highlighted in mint/20 background.

## 6. Do's and Don'ts

### Do:
- **Do** use JetBrains Mono for all numerical data, timestamps, session metadata, and status
  labels. Monospace signals "this is a measurement", Space Grotesk signals "this is meaning".
- **Do** let the Precision Mint accent touch ≤15% of any screen. Its signal value lives in
  its rarity.
- **Do** express depth through tonal surface levels (bg-base → bg-surface → bg-elevated).
  Never through shadows.
- **Do** use `text-wrap: balance` on h1–h3 to prevent awkward single-word orphan lines on
  responsive layouts.
- **Do** write button labels as verb + object: "Delete session", "Export PDF", "Start Pro".
- **Do** show empty states as instructive, not apologetic. An empty heatmap should explain
  what it will show once the user has sessions, not just sit blank.
- **Do** apply reduced-motion alternatives to every animation: crossfade or instant state
  change, never a missing reveal.

### Don't:
- **Don't** build curriculum UI. No lesson trees, no "complete this module" progress paths,
  no XP bars, no "you've unlocked" copy. Commit is not Codecademy.
- **Don't** gamify. No streak-as-product toasts ("You're on fire!"), no mascots, no
  celebration animations for routine actions.
- **Don't** use purple or blue gradients, neon glows, or glassmorphism as decoration. The
  generic dark SaaS palette is the primary anti-reference.
- **Don't** put a monospace uppercase eyebrow label on every section and every card. One per
  section as orientation. Kickers on every component collapse the hierarchy.
- **Don't** use gradient text (`background-clip: text`). A solid color at a different weight
  is always the better choice.
- **Don't** use `border-left` greater than 1px as a colored accent stripe on cards or list
  items. Use a background tint or a full border instead.
- **Don't** add shadows to buttons, card hover states, or section backgrounds. The Tonal
  Depth Rule and No Ambient Shadow Rule are absolute.
- **Don't** use the accent color as a brand wash. The mint appears on data and action, not
  as a general palette color.
