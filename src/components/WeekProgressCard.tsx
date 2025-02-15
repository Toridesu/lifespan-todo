import { Card, CardContent } from './ui/card';
import { useWeekTimer } from '../utils';
import { TimeDisplay } from './TimeDisplay';
import ProgressBar from './ProgressBar';
import { Header } from './Header';
import { Timer } from 'lucide-react';

export default function WeekProgressCard() {
  const { timeLeft, progress } = useWeekTimer();

  return (
    <Card className='max-w-7xl mx-auto py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='あなたの寿命' icon={Timer} />
        <div className='space-y-4'>
          <ProgressBar progress={progress} />
          <TimeDisplay timeLeft={timeLeft} />
        </div>
      </CardContent>
    </Card>
  );
}
