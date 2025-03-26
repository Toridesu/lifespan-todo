import { TimeBox } from './TimeBox';

interface TimeDisplayProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isWarning?: boolean;
}

export function TimeDisplay({ timeLeft, isWarning = false }: TimeDisplayProps) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4'>
      <TimeBox label='残り日数' value={timeLeft.days} unit='日' isWarning={isWarning} />
      <TimeBox label='残り時間' value={timeLeft.hours} unit='時間' />
      <TimeBox label='残り分数' value={timeLeft.minutes} unit='分' />
      <TimeBox label='残り秒数' value={timeLeft.seconds} unit='秒' />
    </div>
  );
}
