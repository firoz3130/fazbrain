'use client';
import { useEffect, useState } from 'react';
import { Todo } from '@/lib/utils/todo';
import fetchTodos from './todos/utils/fetchTodos';
import TodoList from './todos/components/TodoList';
import ProgressBar from './todos/components/ProgressBar';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
      // setLoading(false);
    });
  }, []);

  const total = todos.length;
  const completed = todos.filter((todo) => todo.status === 'Done').length;
  const remaining = todos.filter((todo) => todo.status !== 'Done');
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          🧠 My Second Brain - Todos
        </h1>

        <ProgressBar completed={completed} total={total} progress={progress} />

        {remaining.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-2xl font-bold text-green-700 mb-4">You are all caught up! 🎉</p>
            <img
              src="https://cdn.dribbble.com/users/1682565/screenshots/7302294/media/250dd3d7eac4909632d0a2e6d3481855.gif"
              alt="Chill Time"
              className="mx-auto w-48 rounded-lg shadow-md"
            />
            <p className="mt-4 text-gray-500 italic">Now go grab a coffee ☕ or take a walk 🌳</p>
          </div>
        ) : (
          <TodoList todos={remaining} onUpdate={() => fetchTodos().then(setTodos)} />
        )}
      </div>
    </main>
  );
}