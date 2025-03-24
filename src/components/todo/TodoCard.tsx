import { List, Plus, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useState, FormEvent, useCallback } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { getInitialTodos } from '../../mocks/todoData';
import { Header } from '../common/Header';
import { TodoList } from './TodoList';

const TodoCard = () => {
  // 新しいTodoの入力値を管理
  const [newTodo, setNewTodo] = useState('');

  // 編集中のTodoIDを管理
  const [editingId, setEditingId] = useState<string | null>(null);

  // Todo管理機能を取得
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, reorderTodos } = useTodos(
    getInitialTodos()
  );

  // 新しいTodo追加処理
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
        {/* カードヘッダー */}
        <Header title='いつかやりたい事' icon={List} />

        {/* 新しいToDo追加フォーム */}
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

        {/* 未完了タスクリスト */}
        <div className='space-y-1 mt-4'>
          <TodoList
            todos={todos}
            completed={false}
            editingId={editingId}
            setEditingId={setEditingId}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            reorderTodos={reorderTodos}
          />
        </div>

        {/* 完了済みタスク */}
        <div className='mt-8'>
          <Separator className='my-4' />
          <Header title='完了したタスク' icon={CheckCircle} />
          <div className='space-y-1'>
            <TodoList
              todos={todos}
              completed={true}
              editingId={editingId}
              setEditingId={setEditingId}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              reorderTodos={reorderTodos}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
