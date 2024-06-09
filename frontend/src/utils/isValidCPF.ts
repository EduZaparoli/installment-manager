export const isValidCPF = (cpf: string) => {
	// Remove todos os caracteres não numéricos
	cpf = cpf.replace(/[^\d]+/g, "");

	if (cpf.length !== 11) {
		return false;
	}

	return true;
};
