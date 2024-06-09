export const formatCellphoneNumber = (value: string): string => {
	if (!value) {
		return "";
	}

	if (!/^\d{11}$/.test(value)) {
		return value;
	}

	return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2$3-$4");
};
