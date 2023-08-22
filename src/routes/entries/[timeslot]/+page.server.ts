import { API_URL } from '$env/static/private'

export async function load({ params, fetch }) {
	const data = await fetch(`${API_URL}/timeslots/${params.timeslot}/entries`);

	if (data.status != 200) {
		console.error(await data.text());
		throw new Error('error fetching data');
	}

	return {
		entries: await data.json(),
	}
}