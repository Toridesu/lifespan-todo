import { AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '../ui/alert';
import { TodoItem } from './TodoItem';
import { Todo } from '../../hooks/useTodos';

/**
 * TodoListコンポーネントのプロパティ
 * @property {Todo[]} todos - 表示するTodoアイテムの配列
 * @property {boolean} completed - 完了済みリストか未完了リストかのフラグ
 * @property {string|null} editingId - 現在編集中のTodoのID
 * @property {Function} setEditingId - 編集中のTodoIDを設定する関数
 * @property {Function} toggleTodo - 完了状態を切り替える関数
 * @property {Function} deleteTodo - Todoを削除する関数
 * @property {Function} editTodo - Todoを編集する関数
 */
interface TodoListProps {
  todos: Todo[];
  completed: boolean;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, content: string) => void;
}

/**
 * Todoリストを表示するコンポーネント
 * - 完了済みのリストと未完了リストを分けて表示
 * - 各Todoアイテムの表示と操作
 * - リスト内のアイテムがない場合のメッセージ表示
 */
export const TodoList = ({
  todos,
  completed,
  editingId,
  setEditingId,
  toggleTodo,
  deleteTodo,
  editTodo
}: TodoListProps) => {
  // 完了状態に基づいてTodoリストをフィルタリング
  const filteredTodos = todos.filter(todo => todo.completed === completed);
  
  // フィルタリングした結果、表示するTodoがない場合
  if (filteredTodos.length === 0) {
    return (
      <Alert variant="default" className="bg-gray-50 border-gray-100">
        <AlertDescription className="text-gray-500 text-center">
          {completed 
            // 完了済みリストの場合
            ? 'まだ完了したタスクがありません。タスクを完了しましょう！' 
            // 未完了リストの場合
            : 'タスクがありません。新しいタスクを追加しましょう！'
          }
        </AlertDescription>
      </Alert>
    );
  }
  
  // Todoリストがある場合はそれらを表示
  return (
    // AnimatePresenceはアニメーション効果を管理（framer-motion）
    <AnimatePresence>
      {/* フィルタリングされたTodoをマップして各TodoItemコンポーネントを生成 */}
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}  // Reactのリストレンダリングに必要なkey
          todo={todo}    // Todoデータを渡す
          onToggle={toggleTodo}  // 完了状態切り替え処理
          onDelete={deleteTodo}  // 削除処理
          onEdit={editTodo}      // 編集処理
          isEditing={editingId === todo.id}  // 現在編集中かどうか
          setEditingId={setEditingId}        // 編集状態設定関数
        />
      ))}
    </AnimatePresence>
  );
};