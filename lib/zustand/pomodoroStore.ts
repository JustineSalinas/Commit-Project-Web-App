import { create } from 'zustand';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number; 
  isActive: boolean;
  sessionsCompleted: number;
  expectedEndTime: number | null;
  setMode: (mode: PomodoroMode) => void;
  setTimeLeft: (time: number) => void;
  setIsActive: (isActive: boolean) => void;
  setExpectedEndTime: (time: number | null) => void;
  incrementSessionsCompleted: () => void;
  resetTimer: () => void;
  overrideTime: (time: number) => void;
}

const DEFAULT_FOCUS_TIME = 25 * 60;

export const usePomodoroStore = create<PomodoroState>((set) => ({
  mode: 'focus',
  timeLeft: DEFAULT_FOCUS_TIME,
  isActive: false,
  sessionsCompleted: 0,
  expectedEndTime: null,
  setMode: (mode) => set({ mode }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setIsActive: (isActive) => set({ isActive }),
  setExpectedEndTime: (expectedEndTime) => set({ expectedEndTime }),
  incrementSessionsCompleted: () => set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
  resetTimer: () => set({ 
    isActive: false, 
    timeLeft: DEFAULT_FOCUS_TIME, 
    mode: 'focus',
    expectedEndTime: null
  }),
  overrideTime: (time) => set({ timeLeft: time, isActive: false, expectedEndTime: null }),
}));
