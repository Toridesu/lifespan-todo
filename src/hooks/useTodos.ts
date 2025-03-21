import { useState, useCallback } from 'react';

/**
 * Todoタスクの型定義
 * @property {string} id - タスクの一意の識別子
 * @property {string} content - タスクの内容
 * @property {boolean} completed - タスクの完了状態 (true: 完了、false: 未完了)
 * @property {Date} createdAt - タスクの作成日時
 */
export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Todo管理用のカスタムフック
 * このフックはTodoリストの状態管理と操作に関する機能を提供します
 *
 * @param {Todo[]} initialTodos - 初期表示するTodoリスト（デフォルトは空配列）
 * @returns {Object} Todoリストとそれを操作する関数群
 */
export function useTodos(initialTodos: Todo[] = []) {
  // Todoリストの状態を管理する
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  /**
   * 新しいTodoをリストに追加する関数
   * useCallbackを使用してパフォーマンスを最適化
   *
   * @param {string} content - 追加するTodoの内容
   */
  const addTodo = useCallback((content: string) => {
    // 新しいTodoオブジェクトを作成
    const newTodo: Todo = {
      id: crypto.randomUUID(), // ブラウザAPIを使用してランダムなIDを生成
      content, // 引数で受け取ったTodoの内容
      completed: false, // 初期状態は未完了
      createdAt: new Date(), // 現在の日時
    };
    // 前の状態を更新して、新しいTodoを配列の最後に追加
    setTodos(prev => [...prev, newTodo]);
  }, []);

  /**
   * Todoの完了状態を切り替える関数
   *
   * @param {string} id - 切り替えるTodoのID
   */
  const toggleTodo = useCallback((id: string) => {
    // 前の状態を更新して、指定されたIDのTodoの完了状態を反転させる
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }, []);

  /**
   * 指定されたIDのTodoを削除する関数
   *
   * @param {string} id - 削除するTodoのID
   */
  const deleteTodo = useCallback((id: string) => {
    // 前の状態から指定されたIDのTodoをフィルタリングして除外
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  /**
   * 指定されたIDのTodoの内容を編集する関数
   *
   * @param {string} id - 編集するTodoのID
   * @param {string} content - 新しいTodo内容
   */
  const editTodo = useCallback((id: string, content: string) => {
    // 前の状態を更新して、指定されたIDのTodoの内容を変更
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, content } : todo)));
  }, []);

  // Todoリストとそれを操作する関数群を返す
  return {
    todos, // 現在のTodoリスト
    addTodo, // 追加機能
    toggleTodo, // 完了状態切り替え機能
    deleteTodo, // 削除機能
    editTodo, // 編集機能
  };
}
