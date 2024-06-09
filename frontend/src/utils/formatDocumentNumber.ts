export const formatDocumentNumber = (documentNumber: string): string => {
	if (!/^\d{11}$/.test(documentNumber)) {
		return documentNumber;
	}

	return documentNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
