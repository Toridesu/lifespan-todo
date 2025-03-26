import LifespanCard from './components/lifespan/LifespanCard';
import TodoCard from './components/todo/TodoCard';

export default function App() {
  return (
    <div className='min-h-screen bg-slate-100 pt-4 md:pt-8 pb-4 md:pb-8 space-y-6 md:space-y-12 px-4 md:px-16'>
      <header className='mx-auto py-4 md:py-6 text-center space-y-4 md:space-y-8'>
        <h1 className='text-3xl md:text-6xl font-bold'>Lifespan TODO</h1>
        <p className='text-base md:text-xl text-gray-500'>もうすぐ死ぬとしたら、今日は何をしますか？</p>
      </header>
      <LifespanCard />
      <div className='flex justify-center' style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <div className='w-full'>
          <TodoCard />
        </div>
      </div>
    </div>
  );
}