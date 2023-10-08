import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth.js';
import { verify_status } from '$lib/http/status.js';
import type { EntryReturn, Timeslot, UnfilledEntry } from '$lib/types/index.js';

export async function load({ params, fetch, cookies, depends }) {
	check_auth(cookies);

	depends('app:entries');

	const [timeslot_data, entry_data, missing_data] = await Promise.all([
		fetch(`${env.API_URL}/timeslots?id=${params.timeslot}`),
		fetch(`${env.API_URL}/timeslots/${params.timeslot}/entries`),
		fetch(`${env.API_URL}/timeslots/${params.timeslot}/entries/missing`)
	]);

	await verify_status(timeslot_data);
	await verify_status(entry_data);
	await verify_status(missing_data);

	const data: { entries: EntryReturn[]; timeslot: Timeslot; missing: UnfilledEntry[] } = {
		entries: (await entry_data.json()).msg.map((e: EntryReturn) => {
			e.timestamp = new Date(e.timestamp);

			return e;
		}),
		timeslot: (await timeslot_data.json()).msg[0],
		missing: (await missing_data.json()).msg
	};

	return data;
}
