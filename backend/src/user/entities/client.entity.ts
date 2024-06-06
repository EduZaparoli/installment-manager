export interface Client {
	id: number;
	documentNumber: string;
	name: string;
	email: string;
	cellPhone: string;
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
	status: string | null;
	purchase: Purchase;
}

export type InstallmentsResponse = Installment[];
export type PurchasesResponse = Purchase[];
