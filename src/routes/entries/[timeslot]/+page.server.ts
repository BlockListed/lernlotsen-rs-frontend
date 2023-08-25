import { API_URL } from '$env/static/private';

export async function load({ params, fetch }) {
	const [timeslot_data, data] = await Promise.all([fetch(`${API_URL}/timeslots?id=${params.timeslot}`), fetch(`${API_URL}/timeslots/${params.timeslot}/entries`)]);

	if (timeslot_data.status != 200) {
		console.error(timeslot_data.text())
		throw new Error("error fetch timeslot data");
	}

	if (data.status != 200) {
		console.error(await data.text());
		throw new Error('error fetching data');
	}

	return {
		entries: await data.json(),
		timeslot: await timeslot_data.json()
	};
}
