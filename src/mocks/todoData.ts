import { Todo } from '../hooks/useTodos';

// サンプルTODOデータ
export const mockTodos: Todo[] = [
  {
    id: '1',
    content: '富士山に登る',
    completed: false,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    content: '京都の紅葉を見に行く',
    completed: false,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    content: '沖縄でダイビングする',
    completed: false,
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '4',
    content: '北海道でスキーをする',
    completed: false,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    content: '桜の季節に花見をする',
    completed: false,
    createdAt: new Date('2024-03-01'),
  },
];

export const getInitialTodos = (): Todo[] => {
  return [...mockTodos];
};