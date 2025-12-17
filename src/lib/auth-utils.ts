import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			redirect("/login");
		}

		return session;
	} catch (err) {
		// ⬇️ PROD-এ crash না করে redirect
		redirect("/login");
	}
};

export const requireUnauth = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session) {
		redirect("/");
	}
};
