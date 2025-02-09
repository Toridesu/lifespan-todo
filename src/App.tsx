import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Timer } from 'lucide-react';

function App() {
  // TODOリスト用の状態変数に変更
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);

  // 新しいTODOアイテムを追加する関数
  const addTodo = () => {
    if (todoInput.trim() === '') return;
    const newTodo = { id: Date.now(), text: todoInput.trim() };
    setTodos([...todos, newTodo]);
    setTodoInput('');
  };

  // 指定したTODOアイテムを削除する関数
  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='min-h-screen bg-slate-100 py-8 px-4'>
      {/* 残り時間 */}
      <Card className='max-w-7xl mx-auto py-6 shadow-lg'>
        <CardContent className='py-0'>
          <div className='flex flex-row items-center text-2xl mb-4 text-gray-900'>
            <Timer className='mr-2 w-6' />
            <p className='font-bold'>残りの寿命</p>
          </div>
          <div>
            <div className='relative h-4 bg-gray-200 rounded-full overflow-hidden'>
              {/* widthをJavaScript */}
              <div className='absolute h-full bg-gray-400 transition-all duration-1000' style={{ width: '50%' }} />
            </div>
            <div className='flex flex-row justify-between py-2 gap-4 mt-2 text-gray-800'>
              <div className='bg-gray-100 w-full p-4 rounded-lg'>
                <p className='text-sm font-medium '>残り日数</p>
                <p className='text-3xl font-bold'>6日</p>
              </div>
              <div className='bg-gray-100 w-full p-4 rounded-lg'>
                <p className='text-sm font-medium'>残り時間</p>
                <p className='text-3xl font-bold'>13時間</p>
              </div>
              <div className='bg-gray-100 w-full p-4 rounded-lg'>
                <p className='text-sm font-medium'>残り分数</p>
                <p className='text-3xl font-bold'>38分</p>
              </div>
              <div className='bg-gray-100 w-full p-4 rounded-lg'>
                <p className='text-sm font-medium'>残り秒数</p>
                <p className='text-3xl font-bold'>19秒</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TODOリストと進捗カード */}
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
      </div>
    </div>
  );
}

export default App;
