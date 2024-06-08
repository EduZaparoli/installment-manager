import { api } from "@/service/APIService";

export const COOKIE_ACCESS_TOKEN_KEY = "PARCELADMIN_APP_TOKEN";

export class AuthStore {
	public fetchAccessToken = async (email: string, password: string): Promise<void> => {
		try {
			const token = await api.getAuthorizationToken(email, password);
			this.setCookie(COOKIE_ACCESS_TOKEN_KEY, token.access_token);
		} catch (error) {
			console.log(error);
		}
	};

	public setCookie(cname: string, cvalue: string) {
		document.cookie = `${cname}=${cvalue}; path=/;`;
	}

	public getCookie(cname: string) {
		let name = `${cname}=`;
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	public get isAuthenticated(): boolean {
		let user = this.getCookie(COOKIE_ACCESS_TOKEN_KEY);
		return user !== "";
	}

	public logout = (): void => {
		this.setCookie(COOKIE_ACCESS_TOKEN_KEY, "");
	};
}
