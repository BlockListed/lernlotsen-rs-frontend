import { env } from '$env/dynamic/private';
import { verify_status } from '$lib/http/status';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		throw new Error('Authorization code required!');
	}

	const callback_req = await fetch(`${env.API_URL}/auth/oidc_callback?code=${code}`);

	await verify_status(callback_req);

	const redirect = `${url.protocol}//${url.host}/`;

	return new Response('redirecting now', {
		status: 302,
		headers: {
			location: redirect
		}
	});
};
