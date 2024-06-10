import { AxiosInstance, RawAxiosRequestHeaders } from "axios";
import apiClientService from "../APIClientService";
import * as types from "./types";
import { AuthStore, COOKIE_ACCESS_TOKEN_KEY } from "@/stores/AuthStore";

class API {
	constructor(private api: AxiosInstance) {}

	public getPaymentSlips = async (documentNumber: string): Promise<types.PaymentSlip[]> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.get(`http://localhost:5000/user/${documentNumber}/payment-slips`, {
				headers: this.headerWithAuthentication(token),
			});
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Get Payment Slips error: " + error.message);
			} else {
				throw new Error("Unknown error");
			}
		}
	};

	public downloadPaymentSlip = async (slipId: number): Promise<Blob> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.get(`http://localhost:5000/user/download/paymentSlip/${slipId}`, {
				headers: this.headerWithAuthentication(token),
				responseType: "blob",
			});
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Download Payment Slip error: " + error.message);
			} else {
				throw new Error("Unknown error");
			}
		}
	};

	public createPaymentSlip = async (totalAmount: number, customerInfo: types.CustomerInfo): Promise<string> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.post<{ html: string }>(
				"http://localhost:5000/user/paymentSlip",
				{
					totalAmount,
					customerInfo,
				},
				{
					headers: this.headerWithAuthentication(token),
				},
			);
			return data.html;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Create Payment Slip error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public updateInstallments = async (
		purchaseId: number,
		installmentNumbers: number[],
		status: string,
	): Promise<types.UpdateInstallments> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.put<types.UpdateInstallments>(
				`http://localhost:5000/user/updateInstallments/${purchaseId}`,
				{ installmentNumbers, status },
				{
					headers: this.headerWithAuthentication(token),
				},
			);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Update installments error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public getClient = async (documentNumber: string): Promise<types.Client> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.get<types.Client>(`http://localhost:5000/user/documentNumber/${documentNumber}`, {
				headers: this.headerWithAuthentication(token),
			});
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Search client error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public getClientAllPurchases = async (documentNumber: string): Promise<types.PurchasesResponse> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.get<types.PurchasesResponse>(
				`http://localhost:5000/user/${documentNumber}/purchases/all`,
				{
					headers: this.headerWithAuthentication(token),
				},
			);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Search Purchases error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public getInstallmentsByProduct = async (productId: number): Promise<types.InstallmentsResponse> => {
		try {
			const token = new AuthStore().getCookie(COOKIE_ACCESS_TOKEN_KEY);
			const { data } = await this.api.get<types.InstallmentsResponse>(
				`http://localhost:5000/user/${productId}/installments`,
				{
					headers: this.headerWithAuthentication(token),
				},
			);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Search intallments by product error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public postUser = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	): Promise<types.RegisterUser> => {
		try {
			const { data } = await this.api.post<types.RegisterUser>(
				"http://localhost:5000/user",
				{
					firstName,
					lastName,
					email,
					password,
				},
				{
					headers: this.baseHeaders(),
				},
			);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Create user error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public resetPasswordUser = async (email: string, newPassword: string): Promise<types.ResetPassword> => {
		try {
			const { data } = await this.api.patch<types.ResetPassword>(
				"http://localhost:5000/user/reset-password",
				{
					email,
					newPassword,
				},
				{
					headers: this.baseHeaders(),
				},
			);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Reset password error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	public getAuthorizationToken = async (email: string, password: string): Promise<types.AccessToken> => {
		try {
			const { data } = await this.api.post<types.AccessToken>(
				"http://localhost:5000/login",
				{
					email,
					password,
				},
				{
					headers: this.baseHeaders(),
				},
			);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Authentication error: " + error.message);
			} else {
				throw new Error("Unknow error");
			}
		}
	};

	private headerWithAuthentication = (token: string, headers?: RawAxiosRequestHeaders): RawAxiosRequestHeaders =>
		this.baseHeaders({ Authorization: `Bearer ${token}`, ...headers });

	private baseHeaders = (headers?: RawAxiosRequestHeaders): RawAxiosRequestHeaders => ({
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Accept": "application/json",
		...headers,
	});
}

export const api = new API(apiClientService);

export { types as apiTypes };
