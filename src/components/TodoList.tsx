import { AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from './ui/alert';
import { TodoItem } from './TodoItem';
import { Todo } from '../hooks/useTodos';

interface TodoListProps {
  todos: Todo[];
  completed: boolean;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, content: string) => void;
}

export const TodoList = ({
  todos,
  completed,
  editingId,
  setEditingId,
  toggleTodo,
  deleteTodo,
  editTodo
}: TodoListProps) => {
  const filteredTodos = todos.filter(todo => todo.completed === completed);
  
  if (filteredTodos.length === 0) {
    return (
      <Alert variant="default" className="bg-gray-50 border-gray-100">
        <AlertDescription className="text-gray-500 text-center">
          {completed 
            ? 'まだ完了したタスクがありません。タスクを完了しましょう！' 
            : 'タスクがありません。新しいタスクを追加しましょう！'
          }
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
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
  );
};