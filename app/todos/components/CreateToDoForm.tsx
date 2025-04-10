'use client';
import React, { useState } from 'react';
import { Todo } from '../../../lib/utils/todo';
interface Props {
    onAdd: (newTodo: Todo) => void;
    showNotification: (msg: string, type: 'success' | 'error') => void;
}

const initialState = {
    task: '',
    category: '',
    dueTime: '',
    priority: 'Low',
};

export default function CreateTodoForm({ onAdd, showNotification }: Props) {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData }),
            });

            if (!res.ok) throw new Error('Failed to create todo');

            const newTodo = await res.json();
            onAdd(newTodo);
            showNotification('✅ Task added successfully!', 'success');
            setFormData(initialState);
        } catch (error) {
            console.error('Error creating todo:', error);
            showNotification('❌ Failed to add task', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 gap-4">
            <input name="task" value={formData.task} onChange={handleChange} placeholder="Task name" className="input" required />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="input" required />
            <input name="dueTime" type="datetime-local" value={formData.dueTime} onChange={handleChange} className="input" required />
            <select name="priority" value={formData.priority} onChange={handleChange} className="input">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ➕ Add Todo
            </button>
        </form>
    );
}
