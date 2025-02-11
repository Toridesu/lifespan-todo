interface TimeDisplayProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

interface TimeBoxProps {
  label: string;
  value: number;
  unit: string;
}

export function TimeDisplay({ timeLeft }: TimeDisplayProps) {
  return (
    <div className='flex justify-between gap-4'>
      <TimeBox label='残り日数' value={timeLeft.days} unit='日' />
      <TimeBox label='残り時間' value={timeLeft.hours} unit='時間' />
      <TimeBox label='残り分数' value={timeLeft.minutes} unit='分' />
      <TimeBox label='残り秒数' value={timeLeft.seconds} unit='秒' />
    </div>
  );
}

function TimeBox({ label, value, unit }: TimeBoxProps) {
  return (
    <div className='bg-gray-100 w-full p-4 rounded-lg'>
      <p className='text-sm font-medium text-gray-800'>{label}</p>
      <p className='text-3xl font-bold text-gray-800'>
        {value}
        {unit}
      </p>
    </div>
  );
}
