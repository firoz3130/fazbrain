import { NextResponse } from "next/server";
import { getTodos } from "@/lib/notion";

export async function GET() {
	try {
		const todos = await getTodos();
		return NextResponse.json(todos);
	} catch (error: any) {
		console.error("Error fetching todos:", error.message);
		return NextResponse.json(
			{ error: "Failed to fetch todos" },
			{ status: 500 }
		);
	}
}
