import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  isEditing: boolean;
  setEditingId: (id: string | null) => void;
}

// アニメーションのバリアント定義
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
    <motion.div
      key={todo.id}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={todoItemVariants}
      transition={{ duration: 0.2 }}
      className={`flex items-center p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 ${
        todo.completed ? 'bg-gray-50' : ''
      }`}
    >
      <div className='flex items-center space-x-2'>
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className='data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600 border-gray-300'
        />
      </div>

      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 ml-3 ${todo.completed ? 'text-gray-400' : 'text-gray-800'} ${
          !todo.completed ? 'cursor-pointer' : ''
        } outline-none`}
        contentEditable={!todo.completed && isEditing}
        suppressContentEditableWarning
        onClick={e => {
          if (!todo.completed) {
            setEditingId(todo.id);
            e.currentTarget.focus();
          }
        }}
        onBlur={e => !todo.completed && handleEdit(e)}
        style={{ outline: 'none' }}
      >
        {todo.content}
      </label>

      {/* 完了済みタスクはバッジを表示 */}
      {todo.completed && (
        <Badge variant='outline' className='mr-2 text-xs bg-gray-50'>
          完了済
        </Badge>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              onClick={() => onDelete(todo.id)}
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
