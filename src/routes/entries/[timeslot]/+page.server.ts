import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth.js';

export async function load({ params, fetch, cookies }) {
	check_auth(cookies);

	const [timeslot_data, data, missing] = await Promise.all([
		fetch(`${env.API_URL}/timeslots?id=${params.timeslot}`),
		fetch(`${env.API_URL}/timeslots/${params.timeslot}/entries`),
		fetch(`${env.API_URL}/timeslots/${params.timeslot}/entries/missing`)
	]);

	if (timeslot_data.status != 200) {
		console.error(timeslot_data.text());
		throw new Error('error fetch timeslot data');
	}

	if (data.status != 200) {
		console.error(await data.text());
		throw new Error('error fetching data');
	}

	if (missing.status != 200) {
		console.error(await missing.text());
		throw new Error('Error fetching missing entries');
	}

	return {
		entries: await data.json(),
		timeslot: await timeslot_data.json(),
		missing: await missing.json()
	};
}
