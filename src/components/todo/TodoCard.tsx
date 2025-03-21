import { List, Plus, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useState, FormEvent, useCallback } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { getInitialTodos } from '../../mocks/todoData';

// 分割したコンポーネントをインポート
import { Header } from '../common/Header';
import { TodoList } from './TodoList';

/**
 * TodoカードコンポーネントはToDoリスト全体の管理と表示を行う
 * - 新しいタスクの追加フォーム
 * - 未完了タスクのリスト
 * - 完了済みタスクのリスト
 */
const TodoCard = () => {
  // 新しいTodoの入力値を管理する状態
  const [newTodo, setNewTodo] = useState('');
  
  // 現在編集中のTodoのIDを管理する状態
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // useTodos カスタムフックからTodo管理機能を取得
  // getInitialTodos()でモックデータを初期値として設定
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos(getInitialTodos());

  /**
   * 新しいTodo追加フォームの送信処理
   * useCallbackで不要な再レンダリングを防止
   * 
   * @param {FormEvent} e - フォーム送信イベント
   */
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault(); // デフォルトのフォーム送信を防止
      if (newTodo.trim()) { // 空でない場合のみ追加
        addTodo(newTodo.trim());
        setNewTodo(''); // 入力フィールドをクリア
      }
    },
    [newTodo, addTodo] // 依存配列
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
            onChange={e => setNewTodo(e.target.value)} // 入力値を状態に反映
          />
          <Button
            type='submit'
            variant='default'
            size='icon'
            className='bg-gray-600 hover:bg-gray-700'
            disabled={newTodo.trim() === ''} // 空の場合はボタンを無効化
          >
            <Plus className='h-5 w-5' /> {/* プラスアイコン */}
          </Button>
        </form>

        {/* 未完了タスクリスト */}
        <div className='space-y-1 mt-4'>
          <TodoList
            todos={todos}
            completed={false} // 未完了タスクを表示
            editingId={editingId}
            setEditingId={setEditingId}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>

        {/* 完了済みタスクセクション */}
        <div className='mt-8'>
          <Separator className='my-4' /> {/* 区切り線 */}
          <Header title='完了したタスク' icon={CheckCircle} />
          <div className='space-y-1'>
            <TodoList
              todos={todos}
              completed={true} // 完了済みタスクを表示
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