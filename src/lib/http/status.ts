import { redirect_auth } from "$lib/auth/0auth"

export async function verify_status(r: Response) {
	if (r.status >= 200 && r.status < 300) { return };

	 if (r.status == 401) {
		redirect_auth();
	 }

	 if (r.status == 403) {
		throw new Error("you are not authorized to access this resource");
	 }

	 console.error(`${r.status} - ${await r.text()}`);
	 throw new Error(`${r.status} - request error`);
}