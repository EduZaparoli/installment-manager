import { api, apiTypes } from "@/service/APIService";
import { AttributeShelf } from "@/shelves/AttributeShelf";
import { action, makeObservable, observable } from "mobx";

export class ClientStore {
	public client = new AttributeShelf<apiTypes.Client | null>(null);

	constructor() {
		makeObservable(this, {
			client: observable,
			fetchGetClient: action,
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
}

export const clientStore = new ClientStore();
