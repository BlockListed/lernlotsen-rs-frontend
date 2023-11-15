import { env } from "$env/dynamic/private";
import { verify_status } from "$lib/http/status";
import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params, fetch }) => {
	const ts_id = params.timeslot;
	const index = params.index;

	const resp = await fetch(`${env.API_URL}/timeslots/${ts_id}/entries/${index}`, {
		method: "DELETE",
	});

	await verify_status(resp);

	return new Response("success");
}
