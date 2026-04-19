// Pomodoro Timer Zustand store — Phase 3
// Manages global timer state accessible across all components

export {};
// Full implementation in Phase 3

/**
 * Store shape:
 * {
 *   status: 'idle' | 'focus' | 'short_break' | 'long_break'
 *   timeRemaining: number   // seconds
 *   sessionCount: number    // pomos completed today
 *   weekCount: number       // pomos completed this week
 *   activeTaskId: string | null
 *   distractions: DistractionEntry[]
 *   
 *   // Actions
 *   start: () => void
 *   pause: () => void
 *   reset: () => void
 *   tick: () => void
 *   setActiveTask: (id: string | null) => void
 *   addDistraction: (text: string) => void
 *   completeSession: () => void
 * }
 */
