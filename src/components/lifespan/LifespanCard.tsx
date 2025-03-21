import { Card, CardContent } from '../ui/card';
import { useWeekTimer } from '../../utils';
import { TimeDisplay } from './TimeDisplay';
import ProgressBar from './ProgressBar';
import { Header } from '../common/Header';
import { Timer } from 'lucide-react';

/**
 * LifespanCard コンポーネント
 * ユーザーの残り寿命（この場合は1週間のタイマー）を視覚的に表示するカード
 * - 進捗バーで残り時間の割合を表示
 * - 詳細な残り時間（日、時間、分、秒）を表示
 * 
 * @returns {JSX.Element} 寿命表示カードコンポーネント
 */
export default function LifespanCard() {
  // カスタムフックからタイマー情報を取得
  // timeLeft: 残り時間（日、時間、分、秒）
  // progress: 経過割合（0〜100%）
  // isWarning: 警告表示が必要かどうか（残り時間が少ない場合など）
  const { timeLeft, progress, isWarning } = useWeekTimer();

  return (
    <Card className='max-w-7xl mx-auto py-6 shadow-lg hover:shadow-xl transition-shadow duration-300' style={{ marginTop: '0px' }}>
      <CardContent>
        {/* カードヘッダー - タイマーアイコン付き */}
        <Header title='あなたの寿命' icon={Timer} />
        <div className='space-y-4'>
          {/* 進捗バー - 残り時間の視覚的表示 */}
          <ProgressBar progress={progress} />
          
          {/* 詳細な残り時間表示 */}
          <TimeDisplay timeLeft={timeLeft} isWarning={isWarning} />
        </div>
      </CardContent>
    </Card>
  );
}
