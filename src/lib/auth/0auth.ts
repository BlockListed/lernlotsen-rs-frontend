import { AUTH_AUDIENCE, AUTH_CLIENT_ID, AUTH_DOMAIN, AUTH_REDIRECT } from '$env/static/private';
import { redirect, type Cookies } from '@sveltejs/kit';

export function authorization_url(): string {
	// TODO: figure out how to use this with CSRF.
	return `${AUTH_DOMAIN}/authorize?response_type=code&client_id=${AUTH_CLIENT_ID}&redirect_uri=${AUTH_REDIRECT}&scope=openid&audience=${AUTH_AUDIENCE}`;
}

export function check_auth(cookies: Cookies) {
	if (!cookies.get("auth_token")) {
		throw redirect(302, "/auth/login");
	}
}