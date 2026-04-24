import { useEffect, useCallback } from 'react';
import { usePomodoroStore, PomodoroMode } from '../zustand/pomodoroStore';
import { logFocusSession } from "@/app/actions/crud";

export const usePomodoro = () => {
  const { 
    mode, 
    timeLeft, 
    isActive, 
    sessionsCompleted,
    expectedEndTime,
    settings,
    setMode, 
    setTimeLeft, 
    setIsActive, 
    setExpectedEndTime,
    incrementSessionsCompleted,
    overrideTime,
    setLastSessionDuration
  } = usePomodoroStore();

  const handleTimerComplete = useCallback(async () => {
    setIsActive(false);
    setExpectedEndTime(null);
    
    if (mode === 'focus') {
      // Instead of automatically advancing, we open the commit modal
      usePomodoroStore.getState().setIsCommitModalOpen(true);
    } else {
      setMode('focus'); // This will automatically set the time from settings
    }
  }, [mode, setMode, setIsActive, setExpectedEndTime]);

  const toggleTimer = useCallback(() => {
    if (isActive) {
      setIsActive(false);
      setExpectedEndTime(null);
    } else {
      setIsActive(true);
      setExpectedEndTime(Date.now() + timeLeft * 1000);
      setLastSessionDuration(timeLeft);
    }
  }, [isActive, timeLeft, setIsActive, setExpectedEndTime, setLastSessionDuration]);

  const switchMode = useCallback((newMode: PomodoroMode) => {
    setMode(newMode); // This will automatically handle time and reset active state
  }, [setMode]);

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
    settings,
    toggleTimer,
    switchMode,
    overrideTime
  };
};
