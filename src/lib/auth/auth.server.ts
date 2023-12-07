import { env } from '$env/dynamic/private';
import { verify_status } from '$lib/http/status';
import type { OidcData } from '$lib/types';

export async function get_authorization_url(): Promise<[string, string]> {
	const login_req = await fetch(`${env.API_URL}/auth/oidc_login`);

	await verify_status(login_req);

	const login_data: OidcData = await login_req.json();

	return [login_data.auth_url, login_data.session_id];
}
