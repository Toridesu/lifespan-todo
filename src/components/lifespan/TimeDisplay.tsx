import { Card, CardContent } from '../ui/card';

/**
 * TimeDisplayコンポーネントのプロパティ
 * @property {Object} timeLeft - 残り時間の詳細情報
 * @property {number} timeLeft.days - 残り日数
 * @property {number} timeLeft.hours - 残り時間
 * @property {number} timeLeft.minutes - 残り分数
 * @property {number} timeLeft.seconds - 残り秒数
 * @property {boolean} isWarning - 警告表示が必要かどうか（残り時間が少ない場合など）
 */
interface TimeDisplayProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isWarning?: boolean;
}

/**
 * 個別の時間表示ボックスのプロパティ
 * @property {string} label - 表示する時間の種類（日数、時間など）
 * @property {number} value - 時間の値
 * @property {string} unit - 時間の単位（日、時間、分、秒）
 * @property {boolean} isWarning - 警告表示が必要かどうか
 */
interface TimeBoxProps {
  label: string;
  value: number;
  unit: string;
  isWarning?: boolean;
}

/**
 * 残り時間表示コンポーネント
 * 日、時間、分、秒の4つのボックスで残り時間を視覚的に表示
 * 
 * @param {TimeDisplayProps} props - 残り時間情報とスタイル設定
 * @returns {JSX.Element} 残り時間表示UI
 */
export function TimeDisplay({ timeLeft, isWarning = false }: TimeDisplayProps) {
  return (
    // 横並びの4つのボックスで時間表示
    <div className='flex justify-between gap-4'>
      {/* 日数表示 - 警告フラグは日数ボックスのみに適用 */}
      <TimeBox label='残り日数' value={timeLeft.days} unit='日' isWarning={isWarning} />
      <TimeBox label='残り時間' value={timeLeft.hours} unit='時間' />
      <TimeBox label='残り分数' value={timeLeft.minutes} unit='分' />
      <TimeBox label='残り秒数' value={timeLeft.seconds} unit='秒' />
    </div>
  );
}

/**
 * 単一の時間表示ボックスコンポーネント
 * ラベル、値、単位を表示するカード
 * 
 * @param {TimeBoxProps} props - 表示する時間情報とスタイル設定
 * @returns {JSX.Element} 時間表示ボックスUI
 */
function TimeBox({ label, value, unit, isWarning = false }: TimeBoxProps) {
  return (
    <Card className="w-full bg-gray-100 border-0">
      <CardContent className="p-4">
        {/* ラベル（残り日数、残り時間など） */}
        <p className='text-sm font-medium text-gray-800'>{label}</p>
        
        {/* 時間の値と単位（isWarningがtrueの場合は赤色で表示） */}
        <p className={`text-3xl font-bold ${isWarning ? 'text-red-600' : 'text-gray-800'}`}>
          {value}
          {unit}
        </p>
      </CardContent>
    </Card>
  );
}