import { API_URL } from '$env/static/private';
import type { CreateEntry } from '$lib/types/index.js';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const [timeslot_id, create_req]: [string, CreateEntry] = await request.json();

	const res = await fetch(`${API_URL}/timeslots/${timeslot_id}/entries`, {
		method: "POST",
		body: JSON.stringify(create_req),
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (res.status != 201) {
		console.error(await res.text());
		throw new Error("Couldn't complete entry creation request");
	}

	return new Response("Success");
}