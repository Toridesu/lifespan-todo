import { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Card, CardContent } from './components/ui/card';
import { Timer } from 'lucide-react';

function useWeekTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);

  const calculateTime = () => {
    const now = new Date();
    // 第2引数で weekStartsOn: 1 とすることで月曜日始まりに設定
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    // 週全体の時間（ミリ秒単位）と経過時間から進捗率を計算
    const totalDuration = weekEnd.getTime() - weekStart.getTime();
    const elapsed = now.getTime() - weekStart.getTime();
    const progressValue = Math.min((elapsed / totalDuration) * 100, 100);
    // 残り時間の計算（ミリ秒単位から日、時間、分、秒に分解）
    const remaining = weekEnd.getTime() - now.getTime();
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
    setProgress(progressValue);
  };

  useEffect(() => {
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return { timeLeft, progress };
}

export default function App() {
  const { timeLeft, progress } = useWeekTimer();

  return (
    <div className='min-h-screen bg-slate-100 pt-8 pb-8 space-y-12 px-16'>
      <header className='mx-auto py-6 text-center space-y-8'>
        <h1 className='text-6xl font-bold'>Lifespan TODO</h1>
        <p className='text-xl text-gray-500'>もうすぐ死ぬとしたら、今日は何をしますか？</p>
      </header>
      <Card className='max-w-7xl mx-auto py-6 shadow-lg' style={{ marginTop: '0px' }}>
        <CardContent>
          <div className='flex flex-row items-center text-2xl mb-4 text-gray-900'>
            <Timer className='mr-2 w-6' />
            <p className='font-bold'>今週の進捗</p>
          </div>
          <div>
            {/* 進捗バー */}
            <div className='relative h-4 bg-gray-200 rounded-full overflow-hidden'>
              <div className='absolute h-full bg-gray-400 transition-all duration-1000' style={{ width: `${progress}%` }} />
            </div>
            {/* 残り時間の表示 */}
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

      {/* TODOリストと進捗カード
      <div className='max-w-7xl mx-auto mt-8 flex flex-col md:flex-row gap-4'>
        <div className='flex-1 bg-slate-400 p-4'>
          <h2 className='text-2xl font-bold mb-4'>TODOリスト</h2>
          <div className='flex space-x-2 mb-4'>
            <input type='text' placeholder='TODOを入力' value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className='flex-1 p-2 border border-gray-300 rounded' />
            <button onClick={addTodo} className='bg-blue-500 text-white px-4 py-2 rounded'>
              追加
            </button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className='flex justify-between items-center border-b py-1'>
                <span>{todo.text}</span>
                <button onClick={() => removeTodo(todo.id)} className='text-red-500'>
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1 bg-slate-400 p-4'>
          <h2 className='text-2xl font-bold mb-4'>進捗</h2>
          <p>進捗情報はここに表示されます。</p>
        </div>
      </div> */}
    </div>
  );
}
