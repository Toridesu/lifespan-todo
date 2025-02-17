import { Header } from './Header';
import { List } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';

const TodoCard = () => {
  const [todoText, setTodoText] = useState("TODO1")
  
  return (
    <Card className='py-6 shadow-lg' style={{ marginTop: '0px' }}>
      <CardContent>
        <Header title='いつかやりたい事' icon={List} />
        <form className='flex items-center space-x-3'>
          <input type='text' placeholder='＋ 新しいタスクを追加' className='flex-1 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100' />
        </form>
        <div className='space-y-2 mt-4'>
          <div className='flex items-center p-2 rounded-md focus-within:bg-gray-200'>
            <input type='checkbox' className='form-checkbox h-5 w-5 text-gray-600 transition duration-150 ease-in-out' />
            <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} className='flex-1 ml-3  rounded bg-transparent focus:outline-none '/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
