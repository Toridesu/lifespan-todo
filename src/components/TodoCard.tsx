import { List, Plus } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useState, FormEvent, useCallback } from 'react';
import { useTodos } from '../hooks/useTodos';
import { getInitialTodos } from '../mocks/todoData';

// 分割したコンポーネントをインポート
import { Header } from './Header';
import { TodoList } from './TodoList';

const TodoCard = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos(getInitialTodos());

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (newTodo.trim()) {
        addTodo(newTodo.trim());
        setNewTodo('');
      }
    },
    [newTodo, addTodo]
  );

  return (
    <Card className='py-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <CardContent>
        <Header title='いつかやりたい事' icon={List} />

        <form className='flex items-center space-x-3' onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='新しいタスクを追加'
            className='flex-1 bg-gray-100 border-gray-200'
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          />
          <Button
            type='submit'
            variant='default'
            size='icon'
            className='bg-gray-600 hover:bg-gray-700'
            disabled={newTodo.trim() === ''}
          >
            <Plus className='h-5 w-5' />
          </Button>
        </form>

        <div className='space-y-1 mt-4'>
          <TodoList
            todos={todos}
            completed={false}
            editingId={editingId}
            setEditingId={setEditingId}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>

        <div className='mt-8'>
          <Separator className='my-4' />
          <h3 className='text-lg font-semibold mb-2'>完了したタスク</h3>
          <div className='space-y-1'>
            <TodoList
              todos={todos}
              completed={true}
              editingId={editingId}
              setEditingId={setEditingId}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
