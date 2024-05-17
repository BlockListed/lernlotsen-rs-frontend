import type { HandleFetch } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith('http://127.0.0.1:8080/') || request.url.startsWith(env.API_URL)) {
		const cookies = event.request.headers.get('cookie');
		if (cookies) {
			request.headers.set('cookie', cookies);
		}
	}

	return fetch(request);
};
