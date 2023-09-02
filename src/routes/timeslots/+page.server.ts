import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types.js';
import { check_auth } from '$lib/auth/0auth.js';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	check_auth(cookies);

	const data = await fetch(`${env.API_URL}/timeslots`);

	if (data.status != 200) {
		console.error(await data.text());
		throw new Error('error fetching data');
	}

	return {
		timeslots: await data.json()
	};
};

export const actions = {
	create: async ({ request, fetch, cookies }) => {
		check_auth(cookies);

		const data = await request.formData();

		let index = 0;

		const subject = data.get('subject');
		const weekday = data.get('weekday');
		const time = data.get('time-start');
		const time_end = data.get('time-end');
		const date = data.get('date-start');
		const date_end = data.get('date-end');
		const timezone = data.get('timezone');
		const students: string[] = [];

		for (;;) {
			const tmp = data.get(`student-${index}`);

			if (tmp) {
				students.push(tmp as string);
			} else {
				break;
			}

			index += 1;
		}

		const req = {
			students: students.map((v) => {
				return { name: v };
			}),
			subject: subject,
			weekday: weekday,
			time: {
				start: `${time}:00`,
				end: `${time_end}:00`
			},
			timerange: {
				start: date,
				end: date_end
			},
			timezone: timezone,
		};

		const resp = await fetch(`${env.API_URL}/timeslots`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(req)
		});

		if (resp.status != 201) {
			console.log(await resp.text());
			throw new Error("unable to create timeslot;")
		}
	}
};
