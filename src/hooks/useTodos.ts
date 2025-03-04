import { useState, useCallback } from 'react';

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
}

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = useCallback((content: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      content,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
