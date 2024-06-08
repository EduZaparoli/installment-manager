export interface APIResponse<APIResponse> {
	data: APIResponse;
	message: string;
	status: string;
}

export interface AccessToken {
	access_token: string;
}

export interface User {
	email: string;
	password: string;
}

export interface RegisterUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface ResetPassword {
	email: string;
	newPassword: string;
}

export interface Client {
	id: number;
	documentNumber: string;
	name: string;
	email: string;
	cellPhone: string;
	address: Address;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
}

export interface PurchaseProduct {
	id: number;
	purchaseId: number;
	productId: number;
	amount: number;
	product: Product;
}

export interface Purchase {
	id: number;
	clientId: number;
	purchaseDate: string;
	totalValue: number;
	products: PurchaseProduct[];
}

interface Installment {
	id: number;
	purchaseId: number;
	installmentNumber: number;
	installmentValue: number;
	dueDate: string;
	paymentDate: string | null;
	status: string;
	purchase: Purchase;
}

export interface SelectedInstallments {
	purchaseId: number;
	number: number;
	date: string;
	value: number;
}

export interface UpdateInstallments {
	installmentNumbers: number[];
	status: string;
}

export interface Address {
	street: string;
	number: string;
	neighborhood: string;
	city: string;
	state: string;
	postalCode: string;
}

export interface CustomerInfo {
	name: string;
	cpf: string;
	email: string;
	address: Address;
	installments: SelectedInstallments[];
}

export type InstallmentsResponse = Installment[];
export type PurchasesResponse = Purchase[];
