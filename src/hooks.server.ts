import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  if (request.url.includes("127.0.0.1")) {
	const cookies = event.request.headers.get("cookie");
	if (cookies) {
		request.headers.set('cookie', cookies);
	}
  }

  return fetch(request);
};