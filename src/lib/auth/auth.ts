import { redirect, type Cookies } from '@sveltejs/kit';

export function check_auth(cookies: Cookies) {
	if (!cookies.get('session_id')) {
		redirect_auth();
	}
}

export function redirect_auth() {
	throw redirect(302, '/auth/login');
}
