import { Card, CardContent } from './ui/card';
import { Timer } from 'lucide-react';
import { useWeekTimer } from '../utils';
import ProgressBar from './ProgressBar';

export default function WeekProgressCard() {
  const { timeLeft, progress } = useWeekTimer();

  return (
    <Card className='max-w-7xl mx-auto py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <div className='flex flex-row items-center text-2xl mb-4 text-gray-900'>
          <Timer className='mr-2 w-6' />
          <p className='font-bold'>今週の進捗</p>
        </div>
        <div>
          <ProgressBar progress={progress} />
          <div className='flex flex-row justify-between py-2 gap-4 mt-2 text-gray-800'>
            <div className='bg-gray-100 w-full p-4 rounded-lg'>
              <p className='text-sm font-medium'>残り日数</p>
              <p className='text-3xl font-bold'>{timeLeft.days}日</p>
            </div>
            <div className='bg-gray-100 w-full p-4 rounded-lg'>
              <p className='text-sm font-medium'>残り時間</p>
              <p className='text-3xl font-bold'>{timeLeft.hours}時間</p>
            </div>
            <div className='bg-gray-100 w-full p-4 rounded-lg'>
              <p className='text-sm font-medium'>残り分数</p>
              <p className='text-3xl font-bold'>{timeLeft.minutes}分</p>
            </div>
            <div className='bg-gray-100 w-full p-4 rounded-lg'>
              <p className='text-sm font-medium'>残り秒数</p>
              <p className='text-3xl font-bold'>{timeLeft.seconds}秒</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
