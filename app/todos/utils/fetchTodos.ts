import { Todo } from "../../../lib/utils/todo";
export default async function fetchTodos(): Promise<Todo[]> {
	const res = await fetch("/api/todos");
	return res.json();
}
