import { useState, useCallback, useEffect } from 'react';

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
}

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 新しいTodoを追加
  const addTodo = useCallback((content: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      content,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  // Todoの完了状態を切り替え
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, []);

  // Todoを削除
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Todoを編集
  const editTodo = useCallback((id: string, content: string) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, content } : todo)));
  }, []);

  // Todoの順序を変更
  const reorderTodos = useCallback((newOrder: Todo[]) => {
    setTodos(newOrder);
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
  };
}
