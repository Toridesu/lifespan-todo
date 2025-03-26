import { Reorder, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '../ui/alert';
import { TodoItem } from './TodoItem';
import { Todo } from '../../hooks/useTodos';
import { memo } from 'react';

interface TodoListProps {
  todos: Todo[];
  completed: boolean;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, content: string) => void;
  reorderTodos: (newOrder: Todo[]) => void;
}

export const TodoList = memo(
  ({
    todos,
    completed,
    editingId,
    setEditingId,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
  }: TodoListProps) => {
    // 完了状態に基づいてTodoリストをフィルタリング
    const filteredTodos = todos.filter(todo => todo.completed === completed);

    // 表示するTodoがない場合
    if (filteredTodos.length === 0) {
      return (
        <Alert variant='default' className='bg-gray-50 border-gray-100'>
          <AlertDescription className='text-gray-500 text-center'>
            {completed
              ? 'まだ完了したタスクがありません。タスクを完了しましょう！'
              : 'タスクがありません。新しいタスクを追加しましょう！'}
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Reorder.Group
        axis='y'
        values={filteredTodos}
        onReorder={newOrder => {
          // 同じ完了状態のTODOだけを新しい順序で置き換え
          const otherTodos = todos.filter(todo => todo.completed !== completed);
          const updatedTodos = [...otherTodos, ...newOrder];
          reorderTodos(updatedTodos);
        }}
        className='space-y-1 w-full'
      >
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              isEditing={editingId === todo.id}
              setEditingId={setEditingId}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    );
  }
);
