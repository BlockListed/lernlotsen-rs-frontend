import { authorization_url } from '$lib/auth/0auth';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(302, authorization_url());
};
