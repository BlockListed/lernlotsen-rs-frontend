import { env } from "$env/dynamic/private";
import { check_auth } from "$lib/auth/0auth";
import type { Timeslot } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	check_auth(cookies);

	const timeslots_req = await fetch(`${env.API_URL}/timeslots`);

	if (timeslots_req.status != 200) {
		console.error(await timeslots_req.text());
		throw new Error("Error while fetching timeslots.");
	}

	const timeslots: Timeslot[] = (await timeslots_req.json()).msg;

	const missing_reqs = timeslots.map((ts) => {
		return fetch(`${env.API_URL}/timeslots/${ts.id}/entries/missing`);
	});

	const missing = await Promise.all(missing_reqs);

	await Promise.all(missing.map(async (r) => {
		if (r.status != 200) {
			console.error(await r.text());
			throw new Error("Error while fetching missing entries.")
		}
	}));

	const missing_entries: [Timeslot, [number, string][]][] = await Promise.all(missing.map(async (r, idx) => {
		const entries: [number, string][] = (await r.json()).msg;

		return [timeslots[idx], entries];
	}));

	return {
		missing_entries
	}
}