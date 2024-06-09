import { InstallmentType } from "@/app/selectInstallmentsAdvance/page";
import { api, apiTypes } from "@/service/APIService";
import { CustomerInfo } from "@/service/APIService/types";
import { AttributeShelf } from "@/shelves/AttributeShelf";
import { makeObservable } from "mobx";

export class ClientStore {
	public client = new AttributeShelf<apiTypes.Client>({
		id: 0,
		name: "",
		documentNumber: "",
		cellPhone: "",
		email: "",
		address: {
			city: "",
			neighborhood: "",
			number: "",
			postalCode: "",
			state: "",
			street: "",
		},
	});
	public allPurchases = new AttributeShelf<apiTypes.PurchasesResponse>([]);
	public installments = new AttributeShelf<apiTypes.InstallmentsResponse>([]);
	public selectedInstallments = new AttributeShelf<InstallmentType[]>([]);
	public installmentsTotalValue = new AttributeShelf<number>(0);
	public paymentSlip = new AttributeShelf<string>("");
	public paymentSlips = new AttributeShelf<apiTypes.PaymentSlip[]>([]);

	constructor() {
		makeObservable(this);
	}

	setSelectedInstallments(installments: InstallmentType[]) {
		this.selectedInstallments.set(installments);
	}

	setInstallmentsTotalValue(totalValue: number) {
		this.installmentsTotalValue.set(totalValue);
	}

	public fetchPaymentSlip = async (totalAmount: number, customerInfo: CustomerInfo): Promise<void> => {
		try {
			const paymentSlip = await api.createPaymentSlip(totalAmount, customerInfo);
			this.paymentSlip.set(paymentSlip);
		} catch (e) {
			window.console.error(e);
		}
	};

	public fetchGetClient = async (documentNumber: string): Promise<void> => {
		try {
			const client = await api.getClient(documentNumber);
			this.client.set(client);
		} catch (error) {
			console.error("Search client error:", error);
			throw error;
		}
	};

	public fetchClientAllPurchases = async (documentNumber: string): Promise<void> => {
		try {
			const allPurchases = await api.getClientAllPurchases(documentNumber);
			this.allPurchases.set(allPurchases);
		} catch (e) {
			window.console.error(e);
		}
	};

	public fetchClientInstallmentsByProduct = async (productId: number): Promise<void> => {
		try {
			const installments = await api.getInstallmentsByProduct(productId);
			this.installments.set(installments);
		} catch (e) {
			window.console.error(e);
		}
	};

	public fetchPaymentSlips = async (): Promise<void> => {
		try {
			const paymentSlips = await api.getPaymentSlips(clientStore.client.value.documentNumber);
			this.paymentSlips.set(paymentSlips);
		} catch (e) {
			console.error("Get Payment Slips error:", e);
			throw e;
		}
	};

	public downloadPaymentSlip = async (slipId: number): Promise<Blob> => {
		try {
			return await api.downloadPaymentSlip(slipId);
		} catch (e) {
			console.error("Download Payment Slip error:", e);
			throw e;
		}
	};
}

export const clientStore = new ClientStore();
