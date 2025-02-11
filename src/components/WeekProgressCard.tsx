import { Card, CardContent } from './ui/card';
import { useWeekTimer } from '../utils';
import { TimeDisplay } from './TimeDisplay.tsx';
import ProgressBar from './ProgressBar';
import { Header } from './Header';

export default function WeekProgressCard() {
  const { timeLeft, progress } = useWeekTimer();

  return (
    <Card className='max-w-7xl mx-auto py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header />
        <div className='space-y-4'>
          <ProgressBar progress={progress} />
          <TimeDisplay timeLeft={timeLeft} />
        </div>
      </CardContent>
    </Card>
  );
}
