import { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeLeft(): { timeLeft: TimeLeft; progress: number; isWarning: boolean } {
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

  // 残り日数が0日の場合は警告表示
  const isWarning = timeLeft.days === 0;

  return { timeLeft, progress, isWarning };
}

export function useWeekTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const timerRef = {current: 0} ;

    const updateTime = () => {
      const {
        timeLeft: newTimeLeft,
        progress: newProgress,
        isWarning: newIsWarning,
      } = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      setProgress(newProgress);
      setIsWarning(newIsWarning);
    };

   const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(timerRef.current);
    } else {
      updateTime();
      timerRef.current = window.setInterval(updateTime, 1000);
    }
   };

  // 初期化
  updateTime();
  timerRef.current = window.setInterval(updateTime, 1000);
  
  // visibilitychangeイベントを監視
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // クリーンアップ
  return () => {
    clearInterval(timerRef.current);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };

}, []);

  return { timeLeft, progress, isWarning };
}