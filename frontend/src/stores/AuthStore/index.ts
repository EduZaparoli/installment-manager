import { api } from "@/service/APIService";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const COOKIE_ACCESS_TOKEN_KEY = "PARCELADMIN_APP_TOKEN";

export class AuthStore {
	public fetchAccessToken = async (email: string, password: string): Promise<void> => {
		const token = await api.getAuthorizationToken(email, password);
		this.setCookie(COOKIE_ACCESS_TOKEN_KEY, token.access_token);
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

	private isTokenExpired(token: string): boolean {
		try {
			const decoded: JwtPayload = jwtDecode(token);

			if (!decoded.exp) {
				return true;
			}

			const currentTime = Date.now() / 1000;
			return decoded.exp < currentTime;
		} catch (error) {
			console.error("Invalid token", error);
			return true;
		}
	}

	public get isAuthenticated(): boolean {
		const token = this.getCookie(COOKIE_ACCESS_TOKEN_KEY);
		return token !== "" && !this.isTokenExpired(token);
	}

	public logout = (): void => {
		this.setCookie(COOKIE_ACCESS_TOKEN_KEY, "");
	};
}
