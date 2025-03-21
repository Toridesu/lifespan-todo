import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Todo } from '../../hooks/useTodos';

/**
 * TodoItemコンポーネントのプロパティ
 * @property {Todo} todo - 表示するTodoアイテム
 * @property {Function} onToggle - 完了状態を切り替える関数
 * @property {Function} onDelete - Todoを削除する関数
 * @property {Function} onEdit - Todoを編集する関数
 * @property {boolean} isEditing - 編集モードかどうかのフラグ
 * @property {Function} setEditingId - 編集中のTodoIDを設定する関数
 */
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  isEditing: boolean;
  setEditingId: (id: string | null) => void;
}

/**
 * Todoアイテムのアニメーション設定
 * - initial: 初期状態（表示前）
 * - animate: アニメーション中の状態
 * - exit: 終了状態（非表示になる時）
 */
const todoItemVariants = {
  initial: { opacity: 0, y: 10 },   // 初期状態: 透明で10px下から
  animate: { opacity: 1, y: 0 },    // 表示状態: 不透明で正しい位置
  exit: { opacity: 0, height: 0 },  // 削除時: 透明になり高さが0に
};

/**
 * 1つのTodoアイテムを表示するコンポーネント
 * - チェックボックス、テキスト、削除ボタンを含む
 * - 編集機能あり（未完了時のみ）
 * - アニメーション効果あり
 */
export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  setEditingId,
}: TodoItemProps) => {
  /**
   * 編集終了時の処理
   * テキストが変更されていれば更新する
   * 
   * @param {React.FocusEvent<HTMLSpanElement>} e - フォーカスアウトイベント
   */
  const handleEdit = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newContent = e.currentTarget.textContent;
    // 内容が存在し、かつ前の内容と異なる場合のみ更新
    if (newContent && newContent !== todo.content) {
      onEdit(todo.id, newContent);
    }
    // 編集モードを終了
    setEditingId(null);
  };

  return (
    // アニメーション付きのコンテナ
    <motion.div
      key={todo.id}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={todoItemVariants}
      transition={{ duration: 0.2 }}
      className={`flex items-center p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 ${
        todo.completed ? 'bg-gray-50' : ''  // 完了済みの場合は背景色を変える
      }`}
    >
      {/* チェックボックス */}
      <div className='flex items-center space-x-2'>
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}  // クリックで完了状態を切り替え
          className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600 border-gray-300'
        />
      </div>

      {/* Todoのテキスト部分 - 未完了なら編集可能 */}
      <div
        className={`flex-1 ml-3 ${todo.completed ? 'text-gray-400' : 'text-gray-800'} ${
          !todo.completed ? 'cursor-pointer' : ''
        } outline-none`}
        contentEditable={!todo.completed && isEditing}  // 未完了かつ編集モードの場合のみ編集可能
        suppressContentEditableWarning
        onClick={e => {
          if (!todo.completed) {
            setEditingId(todo.id);    // 編集モードに設定
            e.currentTarget.focus();  // フォーカスを当てる
            // イベントの伝播を防止（チェックボックスに影響しないよう）
            e.stopPropagation();
          }
        }}
        onBlur={e => !todo.completed && handleEdit(e)}  // フォーカスが外れたら編集完了
        style={{ outline: 'none' }}
      >
        {todo.content}
      </div>

      {/* 完了済みタスクの場合はバッジを表示 */}
      {todo.completed && (
        <Badge variant='outline' className='mr-2 text-xs bg-gray-50'>
          完了済
        </Badge>
      )}

      {/* 削除ボタン（ツールチップ付き） */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              onClick={() => onDelete(todo.id)}  // クリックでTodoを削除
              variant='ghost'
              size='icon'
              className='text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>削除</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};