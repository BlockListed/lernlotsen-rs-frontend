import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth';
import { verify_status } from '$lib/http/status';
import type { InformationV3 } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	check_auth(cookies);

	const timeslots_req = await fetch(`${env.API_URL}/timeslots/information`);
	
	await verify_status(timeslots_req);

	const info: InformationV3 = (await timeslots_req.json()).msg;

	const timeslot_data: InformationV3 = info.map((v) => {
		v.next.timestamp = new Date(v.next.timestamp);
		return v;
	});

	timeslot_data.sort((a, b) => {
		const a_next = +a.next.timestamp;
		const b_next = +b.next.timestamp;
		return a_next - b_next;
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
