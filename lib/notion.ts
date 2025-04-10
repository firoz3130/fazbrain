import { Client } from "@notionhq/client";
import { Todo } from "./utils/todo";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

export async function getTodos() {
	try {
		const response = await notion.databases.query({
			database_id: process.env.NEXT_PUBLIC_TODOS_DATABASE_ID as string,
		});

		const pages = response.results.filter(
			(page): page is PageObjectResponse => "properties" in page
		);

		return pages.map(
			(page): Todo => ({
				id: page.id,
				task: page.properties.Task?.rich_text?.[0]?.text?.content || "",
				category: page.properties.Category?.select?.name || "",
				status: page.properties.Status?.status?.name || "",
				dueTime: page.properties["Due Time"]?.number || 0,
				priority: page.properties.Priority?.select?.name || "",
				reminderSent:
					page.properties["Reminder Sent"]?.checkbox || false,
			})
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Notion API error:", error.message);
		} else {
			console.error("Notion API error:", error);
		}
		throw error;
	}
}
