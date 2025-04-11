import { NextResponse } from "next/server";
import { getTodos } from "@/lib/notion";

export async function GET() {
	try {
		const todos = await getTodos();
		return NextResponse.json(todos);
	} catch (error: unknown) {
		console.error("Error fetching todos:", error);
		return NextResponse.json(
			{ error: "Failed to fetch todos" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { task, category, dueTime, priority } = body;

	const notionDbId = process.env.NEXT_PUBLIC_TODOS_DATABASE_ID;
	const notionToken = process.env.NOTION_TOKEN;

	if (!task || !category || !dueTime || !priority) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	const res = await fetch("https://api.notion.com/v1/pages", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${notionToken}`,
			"Notion-Version": "2022-06-28",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			parent: { database_id: notionDbId },
			properties: {
				Task: {
					rich_text: [{ text: { content: task } }],
				},

				Category: {
					select: { name: category },
				},
				DueTime: {
					number: Number(dueTime),
				},

				Priority: {
					select: { name: priority },
				},
				Status: {
					status: { name: "Pending" },
				},
			},
		}),
	});

	if (!res.ok) {
		const error = await res.text();
		console.error("Notion API error:", error); // Log the error
		return NextResponse.json(
			{ error: `Notion error: ${error}` },
			{ status: 500 }
		);
	}

	return NextResponse.json({ message: "Todo created successfully!" });
}
