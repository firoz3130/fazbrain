'use client';
import TodoCard from './TodoCard';
import { Todo } from '../../../lib/utils/todo';

export default function TodoList({ todos, onUpdate }: { todos: Todo[]; onUpdate: () => void }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} onMarkAsDone={onUpdate} />
            ))}
        </div>
    );
}