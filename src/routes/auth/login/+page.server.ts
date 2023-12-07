import { get_authorization_url } from '$lib/auth/auth.server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const [auth_url, session_id] = await get_authorization_url();

	cookies.set('session_id', session_id, {path: "/"});

	throw redirect(302, auth_url);
}
