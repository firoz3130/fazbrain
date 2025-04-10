import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const pageId = params.id;

	try {
		await notion.pages.update({
			page_id: pageId,
			properties: {
				Status: {
					status: {
						name: "Done",
					},
				},
			},
		});

		return NextResponse.json({ success: true });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error marking todo as done:", error.message);
		} else {
			console.error("Error marking todo as done:", error);
		}
		return NextResponse.json(
			{ error: "Failed to update status" },
			{ status: 500 }
		);
	}
}
