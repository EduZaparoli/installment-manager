import { AxiosInstance, RawAxiosRequestHeaders } from "axios";
import apiClientService from "../APIClientService";
import * as types from "./types";

class API {
	constructor(private api: AxiosInstance) {}

	public getPaymentSlip = async (totalAmount: number | null, customerInfo: any): Promise<string> => {
		const { data } = await this.api.post<{ html: string }>("http://localhost:5000/user/paymentSlip", {
			totalAmount,
			customerInfo,
		});
		return data.html;
	};

	public updateInstallments = async (
		purchaseId: number,
		installmentNumbers: number[],
		status: string,
	): Promise<types.UpdateInstallments> => {
		const { data } = await this.api.put<types.UpdateInstallments>(
			`http://localhost:5000/user/updateInstallments/${purchaseId}`,
			{ installmentNumbers, status },
			{
				headers: this.baseHeaders(),
			},
		);
		return data;
	};

	public getClient = async (documentNumber: string): Promise<types.Client> => {
		const { data } = await this.api.get<types.Client>(`http://localhost:5000/user/documentNumber/${documentNumber}`, {
			headers: this.baseHeaders(),
		});
		return data;
	};

	public getClientAllPurchases = async (documentNumber: string): Promise<types.PurchasesResponse> => {
		const { data } = await this.api.get<types.PurchasesResponse>(
			`http://localhost:5000/user/${documentNumber}/purchases/all`,
			{
				headers: this.baseHeaders(),
			},
		);
		return data;
	};

	public getInstallmentsByProduct = async (productId: number): Promise<types.InstallmentsResponse> => {
		const { data } = await this.api.get<types.InstallmentsResponse>(
			`http://localhost:5000/user/${productId}/installments`,
			{
				headers: this.baseHeaders(),
			},
		);
		return data;
	};

	public postUser = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	): Promise<types.RegisterUser> => {
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
	};

	public resetPasswordUser = async (email: string, newPassword: string): Promise<types.ResetPassword> => {
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
	};

	public getAuthorizationToken = async (email: string, password: string): Promise<types.AccessToken> => {
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
