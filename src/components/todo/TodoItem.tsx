import { Reorder } from 'framer-motion';
import { Trash2, GripVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Todo } from '../../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  isEditing: boolean;
  setEditingId: (id: string | null) => void;
}

// アニメーション設定
const todoItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, height: 0 },
};

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  setEditingId,
}: TodoItemProps) => {
  const handleEdit = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newContent = e.currentTarget.textContent;
    if (newContent && newContent !== todo.content) {
      onEdit(todo.id, newContent);
    }
    setEditingId(null);
  };

  return (
    <Reorder.Item
      value={todo}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={todoItemVariants}
      transition={{ duration: 0.2 }}
      className={`flex items-center p-1 md:p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${
        todo.completed ? 'bg-gray-50' : ''
      }`}
    >
      {/* ドラッグハンドル - モバイルで小さく */}
      <div className='cursor-grab active:cursor-grabbing p-0.5 md:p-1 mr-0.5 md:mr-1 text-gray-400 hover:text-gray-600'>
        <GripVertical className='h-3 w-3 md:h-4 md:w-4' />
      </div>

      {/* チェックボックス */}
      <div className='flex items-center justify-center my-auto'>
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          aria-label={`タスク「${todo.content}」を${
            todo.completed ? '未完了' : '完了'
          }としてマーク`}
          className='h-3 w-3 md:h-4 md:w-4 data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600 border-gray-300'
        />
      </div>

      {/* Todoのテキスト部分 */}
      <div
        className={`flex-1 ml-2 md:ml-3 text-sm md:text-base ${
          todo.completed ? 'text-gray-400' : 'text-gray-800'
        } ${!todo.completed ? 'cursor-pointer' : ''} outline-none overflow-hidden break-words`}
        contentEditable={!todo.completed && isEditing}
        suppressContentEditableWarning
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
          }
          if (e.key === 'Escape') {
            setEditingId(null);
          }
        }}
        onBlur={e => !todo.completed && handleEdit(e)}
        style={{ outline: 'none' }}
      >
        {todo.content}
      </div>

      {/* 削除ボタン - モバイルで小さめに */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              onClick={() => onDelete(todo.id)}
              variant='ghost'
              size='icon'
              aria-label={`タスク「${todo.content}」を削除`}
              className='h-6 w-6 md:h-8 md:w-8 p-0.5 md:p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors'
            >
              <Trash2 className='h-3.5 w-3.5 md:h-4 md:w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>削除</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Reorder.Item>
  );
};