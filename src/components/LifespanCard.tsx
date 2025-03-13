import { Card, CardContent } from './ui/card';
import { useWeekTimer } from '../utils';
import { TimeDisplay } from './TimeDisplay';
import ProgressBar from './ProgressBar';
import { Header } from './Header';
import { Timer } from 'lucide-react';

export default function LifespanCard() {
  const { timeLeft, progress, isWarning } = useWeekTimer();

  return (
    <Card className='max-w-7xl mx-auto py-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <CardContent>
        <Header title='あなたの寿命' icon={Timer} />
        <div className='space-y-4'>
          <ProgressBar progress={progress} />
          <TimeDisplay timeLeft={timeLeft} isWarning={isWarning} />
        </div>
      </CardContent>
    </Card>
  );
}
