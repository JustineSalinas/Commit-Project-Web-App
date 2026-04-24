import { useEffect, useCallback } from 'react';
import { usePomodoroStore, PomodoroMode } from '../zustand/pomodoroStore';
import { logFocusSession } from "@/app/actions/crud";

const TIMES: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const usePomodoro = () => {
  const { 
    mode, 
    timeLeft, 
    isActive, 
    sessionsCompleted,
    expectedEndTime,
    setMode, 
    setTimeLeft, 
    setIsActive, 
    setExpectedEndTime,
    incrementSessionsCompleted,
    overrideTime
  } = usePomodoroStore();

  const handleTimerComplete = useCallback(async () => {
    setIsActive(false);
    setExpectedEndTime(null);
    
    if (mode === 'focus') {
      // Instead of automatically advancing, we open the commit modal
      // The modal will be responsible for advancing the timer after submission
      usePomodoroStore.getState().setIsCommitModalOpen(true);
    } else {
      setMode('focus');
      setTimeLeft(TIMES['focus']);
    }
  }, [mode, setMode, setTimeLeft, setIsActive, setExpectedEndTime]);

  const toggleTimer = useCallback(() => {
    if (isActive) {
      setIsActive(false);
      setExpectedEndTime(null);
    } else {
      setIsActive(true);
      setExpectedEndTime(Date.now() + timeLeft * 1000);
    }
  }, [isActive, timeLeft, setIsActive, setExpectedEndTime]);

  const switchMode = useCallback((newMode: PomodoroMode) => {
    setIsActive(false);
    setExpectedEndTime(null);
    setMode(newMode);
    setTimeLeft(TIMES[newMode]);
  }, [setIsActive, setExpectedEndTime, setMode, setTimeLeft]);

  useEffect(() => {
    if (!isActive || !expectedEndTime) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.round((expectedEndTime - now) / 1000);

      if (remainingTime <= 0) {
        setTimeLeft(0);
        handleTimerComplete();
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, expectedEndTime, setTimeLeft, handleTimerComplete]);

  return {
    mode,
    timeLeft,
    isActive,
    sessionsCompleted,
    toggleTimer,
    switchMode,
    overrideTime
  };
};
