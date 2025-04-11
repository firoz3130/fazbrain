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
            console.log('res', res);
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
        <form onSubmit={handleSubmit} className="bg-white-600 p-4 rounded-lg shadow mb-6 grid grid-cols-1 gap-4 text-black">
            <input name="task" value={formData.task} onChange={handleChange} placeholder="Task name" className="input" required />
            <select name="category" value={formData.category} onChange={handleChange} className='input'>
                <option value="" disabled>Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Fitness">Fitness</option>
                <option value="Other">Other</option>
            </select>
            <input name="dueTime" type="number" value={formData.dueTime} onChange={handleChange} className="input" required />
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
