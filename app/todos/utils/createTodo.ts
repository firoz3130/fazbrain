import { Todo } from "../../../lib/utils/todo";

export async function createTodo(todo: Partial<Todo>) {
	const res = await fetch("/api/todos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(todo),
	});

	if (!res.ok) throw new Error("Failed to create todo");
	return await res.json();
}
