import { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeLeft(): { timeLeft: TimeLeft; progress: number } {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const totalDuration = weekEnd.getTime() - weekStart.getTime();
  const elapsed = now.getTime() - weekStart.getTime();
  const progress = Math.min((elapsed / totalDuration) * 100, 100);
  const remaining = weekEnd.getTime() - now.getTime();

  const timeLeft = {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((remaining % (1000 * 60)) / 1000),
  };

  return { timeLeft, progress };
}

export function useWeekTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const { timeLeft: newTimeLeft, progress: newProgress } = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      setProgress(newProgress);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return { timeLeft, progress };
}
