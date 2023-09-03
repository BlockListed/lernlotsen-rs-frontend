import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth.js';
import { verify_status } from '$lib/http/status.js';

export async function load({ params, fetch, cookies }) {
	check_auth(cookies);

	const [timeslot_data, data, missing] = await Promise.all([
		fetch(`${env.API_URL}/timeslots?id=${params.timeslot}`),
		fetch(`${env.API_URL}/timeslots/${params.timeslot}/entries`),
		fetch(`${env.API_URL}/timeslots/${params.timeslot}/entries/missing`)
	]);

	await verify_status(timeslot_data);
	await verify_status(data);
	await verify_status(missing);

	return {
		entries: await data.json(),
		timeslot: await timeslot_data.json(),
		missing: await missing.json()
	};
}
