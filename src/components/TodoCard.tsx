import { Header } from './Header';
import { List, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useState, FormEvent } from 'react';
import { useTodos, Todo } from '../hooks/useTodos';
import { motion } from 'framer-motion';
import { getInitialTodos } from '../mocks/todoData';

const TodoCard = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos(getInitialTodos());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleEdit = (todo: Todo, e: React.FocusEvent<HTMLSpanElement>) => {
    const newContent = e.currentTarget.textContent;
    if (newContent && newContent !== todo.content) {
      editTodo(todo.id, newContent);
    }
    setEditingId(null);
  };

  return (
    <Card className='py-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <CardContent>
        <Header title='いつかやりたい事' icon={List} />
        <form className='flex items-center space-x-3' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='新しいタスクを追加'
            className='flex-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 border border-gray-200'
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          />
          <Button
            type='submit'
            variant='default'
            size='icon'
            className='bg-blue-500 hover:bg-blue-600'
          >
            <Plus className='h-5 w-5' />
          </Button>
        </form>
        <div className='space-y-1 mt-4'>
          {todos.length === 0 ? (
            <p className='text-gray-500 text-center py-4'>
              タスクがありません。新しいタスクを追加しましょう！
            </p>
          ) : (
            todos.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 ${
                  todo.completed ? 'bg-gray-50' : ''
                }`}
              >
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className='form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-150 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                />
                <span
                  className={`flex-1 ml-3 ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  } ${!todo.completed ? 'cursor-pointer' : ''} outline-none`}
                  contentEditable={!todo.completed && editingId === todo.id}
                  suppressContentEditableWarning
                  onClick={e => {
                    if (!todo.completed) {
                      setEditingId(todo.id);
                      e.currentTarget.focus();
                    }
                  }}
                  onBlur={e => !todo.completed && handleEdit(todo, e)}
                  style={{ outline: 'none' }}
                >
                  {todo.content}
                </span>
                <Button
                  type='button'
                  onClick={() => deleteTodo(todo.id)}
                  variant='ghost'
                  size='icon'
                  className='text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
