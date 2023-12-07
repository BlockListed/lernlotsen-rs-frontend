import { redirect_auth } from '$lib/auth/auth';
import { error } from '@sveltejs/kit';

export async function verify_status(r: Response) {
	if (r.status >= 200 && r.status < 300) {
		return;
	}

	if (r.status == 401) {
		redirect_auth();
	}

	if (r.status == 403) {
		throw error(403, 'you are not authorized to access this resource');
	}

	console.error(`${r.status} - ${await r.text()}`);
	throw error(502, `${r.status} - request error`);
}
