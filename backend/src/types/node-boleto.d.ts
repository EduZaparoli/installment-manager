declare module "node-boleto" {
	interface BoletoOptions {
		banco: string;
		data_emissao: Date;
		data_vencimento: Date;
		valor: number;
		nosso_numero: string;
		numero_documento: string;
		cedente: string;
		cedente_cnpj: string;
		agencia: string;
		codigo_cedente: string;
		carteira: string;
		pagador: any;
		local_de_pagamento: string;
	}

	class Boleto {
		constructor(options: BoletoOptions);
		renderHTML(callback: (html: string) => void): void;
	}

	export = Boleto;
}
