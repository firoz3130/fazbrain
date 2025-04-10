'use client';
import { Todo } from '../../../lib/utils/todo';

export default function TodoCard({ todo, onMarkAsDone }: { todo: Todo; onMarkAsDone: () => void }) {
    const handleDone = async () => {
        await fetch(`/api/todos/${todo.id}/done`, { method: 'PATCH' });
        onMarkAsDone();
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{todo.task}</h2>
            <p className="text-sm text-gray-500 mb-1">Category: {todo.category}</p>
            <p className="text-sm text-gray-600 mb-1">Due: {todo.dueTime}</p>
            <p className="text-sm text-gray-600 mb-1">Priority: {todo.priority}</p>
            <p className="text-sm text-gray-600 mb-2">Reminder Sent: {todo.reminderSent ? '✅' : '❌'}</p>
            {todo.status !== 'Done' && (
                <button
                    onClick={handleDone}
                    className="mt-2 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 transition"
                >
                    ✔️ Mark as Done
                </button>
            )}
        </div>
    );
}