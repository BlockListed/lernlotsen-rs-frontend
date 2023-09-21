import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth';
import { verify_status } from '$lib/http/status';
import type { Timeslot } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	check_auth(cookies);

	const timeslots_req = await fetch(`${env.API_URL}/timeslots/home_information`);
	
	await verify_status(timeslots_req);

	const info: [Timeslot, [number, Date], [number, string][]][] = (await timeslots_req.json()).msg;

	const timeslot_data: [Timeslot, [number, Date], number][] = info.map((v) => {
		const ts = v[0];
		const next: [number, Date] = [v[1][0], new Date(v[1][1])];
		const missing_count = v[2].length;
		return [ts, next, missing_count]
	});

	timeslot_data.sort((a, b) => {
		return a[1][1].getMilliseconds() - b[1][1].getMilliseconds();
	});

	return {
		timeslots: timeslot_data
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
			timezone: timezone
		};

		const resp = await fetch(`${env.API_URL}/timeslots`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(req)
		});

		await verify_status(resp);
	}
};
