import { Todo } from "../../../lib/utils/todo";

export async function createTodo(todo: Partial<Todo>) {
	const res = await fetch("/api/todos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(todo),
	});
	console.log("res", res);
	if (res.status === 400) {
		const data = await res.json();
		throw new Error(data.message);
	}
	if (res.status === 500) {
		throw new Error("Internal server error");
	}
	if (res.status === 401) {
		throw new Error("Unauthorized");
	}
	if (res.status === 403) {
		throw new Error("Forbidden");
	}
	if (res.status === 404) {
		throw new Error("Not found");
	}
	if (res.status === 409) {
		throw new Error("Conflict");
	}
	if (res.status === 422) {
		throw new Error("Unprocessable entity");
	}

	if (!res.ok) throw new Error("Failed to create todo");
	return await res.json();
}
