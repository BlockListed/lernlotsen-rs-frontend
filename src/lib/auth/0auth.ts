import { env } from '$env/dynamic/private';
import { redirect, type Cookies } from '@sveltejs/kit';

export function authorization_url(): string {
	// TODO: figure out how to use this with CSRF.
	return `${env.AUTH_DOMAIN}/authorize?response_type=code&client_id=${env.AUTH_CLIENT_ID}&redirect_uri=${env.AUTH_REDIRECT}&scope=openid&audience=${env.AUTH_AUDIENCE}`;
}

export function check_auth(cookies: Cookies) {
	if (!cookies.get("auth_token")) {
		throw redirect(302, "/auth/login");
	}
}