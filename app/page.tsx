'use client';
import { useEffect, useState } from 'react';
import { Todo } from './../lib/utils/todo';
import ProgressBar from './todos/components/ProgressBar';
import CreateTodoForm from './todos/components/CreateToDoForm';
import Notification from './todos/components/Notification';
import TodoList from './todos/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleMarkAsDone = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}/done`, { method: 'PATCH' });
      if (res.ok) fetchTodos();
      else setNotification({ msg: '❌ Failed to update status', type: 'error' });
    } catch {
      setNotification({ msg: '❌ Something went wrong', type: 'error' });
    }
  };

  const handleAdd = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const showNotification = (msg: string, type: 'success' | 'error') => {
    setNotification({ msg, type });
  };

  const completed = todos.filter((t) => t.status === 'Done').length;
  const remaining = todos.filter((t) => t.status !== 'Done');
  const progress = todos.length ? Math.round((completed / todos.length) * 100) : 0;

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">🧠 My Second Brain - Todos</h1>

        <CreateTodoForm onAdd={handleAdd} showNotification={showNotification} />
        <ProgressBar completed={completed} total={todos.length} progress={progress} />

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
          <TodoList todos={remaining} onMarkDone={handleMarkAsDone} />
        )}

        {notification && (
          <Notification message={notification.msg} type={notification.type} onClose={() => setNotification(null)} />
        )}
      </div>
    </main>
  );
}
