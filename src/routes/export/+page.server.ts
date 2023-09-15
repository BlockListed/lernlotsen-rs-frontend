import { env } from '$env/dynamic/private';
import { check_auth } from '$lib/auth/0auth';
import { verify_status } from '$lib/http/status';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ cookies, fetch, url }) => {
	check_auth(cookies);

	const search = url.searchParams;

	const start_year = search.get('start_year');
	const start_week = search.get('start_week');

	const end_year = search.get('end_year');
	const end_week = search.get('end_week');

	if (!(start_year && start_week && end_year && end_week)) {
		throw error(
			422,
			'missing query paramets. (start_year, start_week, end_year, end_week required.)'
		);
	}

	const export_req = await fetch(
		`${env.API_URL}/timeslots/export?${new URLSearchParams({
			start_year,
			start_week,
			end_year,
			end_week
		}).toString()}`
	);

	// The range end is in the future
	if (export_req.status == 412) {
		throw error(412, "end week hasn't finished yet.");
	}

	// An entry is missing.
	if (export_req.status == 428) {
		throw error(428, JSON.stringify((await export_req.json()).error));
	}

	await verify_status(export_req);

	const export_str: string = (await export_req.json()).msg;

	return {
		export: export_str
	};
};
