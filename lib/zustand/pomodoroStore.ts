import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  focusTime: number;      // in seconds
  shortBreakTime: number; // in seconds
  longBreakTime: number;  // in seconds
}

interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number; 
  isActive: boolean;
  sessionsCompleted: number;
  expectedEndTime: number | null;
  activeTaskId: string | null;
  isCommitModalOpen: boolean;
  settings: PomodoroSettings;
  lastSessionDuration: number; // Duration of the session that just finished
  setMode: (mode: PomodoroMode) => void;
  setTimeLeft: (time: number) => void;
  setIsActive: (isActive: boolean) => void;
  setExpectedEndTime: (time: number | null) => void;
  setActiveTaskId: (id: string | null) => void;
  setIsCommitModalOpen: (isOpen: boolean) => void;
  setLastSessionDuration: (duration: number) => void;
  updateSettings: (settings: Partial<PomodoroSettings>) => void;
  incrementSessionsCompleted: () => void;
  resetTimer: () => void;
  overrideTime: (time: number) => void;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
};

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      mode: 'focus',
      timeLeft: DEFAULT_SETTINGS.focusTime,
      isActive: false,
      sessionsCompleted: 0,
      expectedEndTime: null,
      activeTaskId: null,
      isCommitModalOpen: false,
      settings: DEFAULT_SETTINGS,
      lastSessionDuration: DEFAULT_SETTINGS.focusTime,
      
      setMode: (mode) => {
        const { settings } = get();
        let nextTime = settings.focusTime;
        if (mode === 'shortBreak') nextTime = settings.shortBreakTime;
        if (mode === 'longBreak') nextTime = settings.longBreakTime;
        
        set({ mode, timeLeft: nextTime, isActive: false, expectedEndTime: null });
      },
      
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      setIsActive: (isActive) => set({ isActive }),
      setExpectedEndTime: (expectedEndTime) => set({ expectedEndTime }),
      setActiveTaskId: (activeTaskId) => set({ activeTaskId }),
      setIsCommitModalOpen: (isCommitModalOpen) => set({ isCommitModalOpen }),
      setLastSessionDuration: (lastSessionDuration) => set({ lastSessionDuration }),
      
      updateSettings: (newSettings) => {
        const currentSettings = get().settings;
        const updated = { ...currentSettings, ...newSettings };
        set({ settings: updated });
        
        // If not active, update the current time if we are in the affected mode
        const state = get();
        if (!state.isActive) {
          if (state.mode === 'focus') set({ timeLeft: updated.focusTime });
          if (state.mode === 'shortBreak') set({ timeLeft: updated.shortBreakTime });
          if (state.mode === 'longBreak') set({ timeLeft: updated.longBreakTime });
        }
      },
      
      incrementSessionsCompleted: () => set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
      
      resetTimer: () => {
        const { mode, settings } = get();
        let nextTime = settings.focusTime;
        if (mode === 'shortBreak') nextTime = settings.shortBreakTime;
        if (mode === 'longBreak') nextTime = settings.longBreakTime;
        
        set({ 
          isActive: false, 
          timeLeft: nextTime, 
          expectedEndTime: null
        });
      },
      
      overrideTime: (time) => set({ timeLeft: time, isActive: false, expectedEndTime: null }),
    }),
    {
      name: 'commit-pomodoro-storage',
      partialize: (state) => ({ settings: state.settings }), // Only persist settings
    }
  )
);
