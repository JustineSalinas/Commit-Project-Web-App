import { useEffect, useCallback } from 'react';
import { usePomodoroStore, PomodoroMode } from '../zustand/pomodoroStore';

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

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);
    setExpectedEndTime(null);
    
    if (mode === 'focus') {
      incrementSessionsCompleted();
      const nextMode = (sessionsCompleted + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(TIMES[nextMode]);
    } else {
      setMode('focus');
      setTimeLeft(TIMES['focus']);
    }
  }, [mode, sessionsCompleted, incrementSessionsCompleted, setMode, setTimeLeft, setIsActive, setExpectedEndTime]);

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
