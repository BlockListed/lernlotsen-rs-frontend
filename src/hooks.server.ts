import type { HandleFetch } from "@sveltejs/kit";

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith("http://127.0.0.1:8080/")) {
		const cookies = event.request.headers.get("cookie");
		if (cookies) {
			request.headers.set("cookies", cookies);
		}
	}

	return fetch(request)
}