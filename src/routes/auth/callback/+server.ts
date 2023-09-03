import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (e) => {
	const code = e.url.searchParams.get('code');

	if (!code) {
		throw new Error('Authorization code required!');
	}

	const token_resp = await fetch(`${env.AUTH_DOMAIN}/oauth/token`, {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			client_id: env.AUTH_CLIENT_ID,
			client_secret: env.AUTH_CLIENT_SECRET,
			code: code,
			redirect_uri: env.AUTH_REDIRECT
		})
	});

	if (token_resp.status != 200) {
		console.error(await token_resp.text());
		throw new Error("Couldn't exchange code");
	}

	const token = await token_resp.json();

	e.cookies.set('auth_token', token.access_token, {
		path: '/',
		maxAge: 86400
	});

	const url = new URL(e.request.url);

	const redirect = `${url.protocol}//${url.host}/`;

	return new Response('redirecting now', {
		status: 302,
		headers: {
			location: redirect
		}
	});
};
