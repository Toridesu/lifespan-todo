import LifespanCard from './components/lifespan/LifespanCard';
import TodoCard from './components/todo/TodoCard';
import { useNetworkStatus } from './hooks/useNetworkStatus';

export default function App() {
  const isOnline = useNetworkStatus();

  return (
    <div className='min-h-screen bg-slate-100 pt-4 md:pt-8 pb-4 md:pb-8 space-y-6 px-4 md:px-16'>
      {!isOnline && (
        <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4'>
          <p>オフラインモードです。変更は端末に保存され、オンライン時に同期されます。</p>
        </div>
      )}
      <header className='mx-auto py-4 md:py-6 text-center space-y-4 md:space-y-8'>
        <h1 className='text-3xl md:text-6xl font-bold'>Lifespan TODO</h1>
        <p className='text-base md:text-xl text-gray-500'>
          もうすぐ死ぬとしたら、今日は何をしますか？
        </p>
      </header>
      <LifespanCard />
      <div className='flex justify-center'>
        <div className='w-full'>
          <TodoCard />
        </div>
      </div>
    </div>
  );
}
