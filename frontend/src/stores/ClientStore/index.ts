import { api, apiTypes } from "@/service/APIService";
import { AttributeShelf } from "@/shelves/AttributeShelf";
import { action, makeObservable, observable } from "mobx";

export class ClientStore {
	public client = new AttributeShelf<apiTypes.Client | null>(null);
	public allPurchases = new AttributeShelf<apiTypes.PurchasesResponse>([]);
	public installments = new AttributeShelf<apiTypes.InstallmentsResponse>([]);

	constructor() {
		makeObservable(this, {
			client: observable,
			allPurchases: observable,
			installments: observable,
			fetchGetClient: action,
			fetchClientAllPurchases: action,
			fetchClientInstallmentsByProduct: action,
		});
	}

	public fetchGetClient = async (documentNumber: string): Promise<void> => {
		try {
			const client = await api.getClient(documentNumber);
			this.client.set(client);
		} catch (e) {
			window.console.error(e);
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
}

export const clientStore = new ClientStore();
