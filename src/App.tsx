import WeekProgressCard from './components/WeekProgressCard';
import TodoCard from './components/TodoCard';
import DiaryCard from './components/DiaryCard';

export default function App() {
  return (
    <div className='min-h-screen bg-slate-100 pt-8 pb-8 space-y-12 px-16'>
      <header className='mx-auto py-6 text-center space-y-8'>
        <h1 className='text-6xl font-bold'>Lifespan TODO</h1>
        <p className='text-xl text-gray-500'>もうすぐ死ぬとしたら、今日は何をしますか？</p>
      </header>
      <WeekProgressCard />
      <div className='grid grid-cols-2 gap-8'>
        <TodoCard />
        <DiaryCard />
      </div>
    </div>
  );
}
