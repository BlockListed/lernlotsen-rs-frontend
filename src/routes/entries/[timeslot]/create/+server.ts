import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth';
import type { CreateEntry } from '$lib/types/index.js';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
	check_auth(cookies);

	const [timeslot_id, create_req]: [string, CreateEntry] = await request.json();

	const res = await fetch(`${env.API_URL}/timeslots/${timeslot_id}/entries`, {
		method: 'POST',
		body: JSON.stringify(create_req),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.status != 201) {
		console.error(await res.text());
		return new Response(await res.text(), {
			status: res.status
		});
	}

	return new Response('Success');
};
