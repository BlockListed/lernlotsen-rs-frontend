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

	const next_reqs = timeslots.map((ts) => {
		return fetch(`${env.API_URL}/timeslots/${ts.id}/entries/next`);
	})

	const [missing, next] = await Promise.all([Promise.all(missing_reqs), Promise.all(next_reqs)]);

	const missing_data: [number, string][][] = await Promise.all(missing.map(async (r) => {
		if (r.status != 200) {
			console.error(await r.text());
			throw new Error("Error while fetching missing entries.")
		}

		return (await r.json()).msg
	}));

	const next_data: [number, string][] = await Promise.all(next.map(async (r) => {
		if (r.status != 200) {
			console.error(await r.text());
			throw new Error("Error while fetching next entry");
		}

		return (await r.json()).msg
	}))

	const timeslot_data: [Timeslot, [number, string], [number, string][]][] = timeslots.map((ts, idx) => {
		return [ts, next_data[idx], missing_data[idx]]
	})

	return {
		timeslots: timeslot_data,
	}
}