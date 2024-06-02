import { InstallmentType } from "@/app/selectInstallmentsAdvance/page";
import { Installment } from "@/components/molecules/Installment";
import { useStore } from "@/stores/storeProvider";
import { themes } from "@/themes/theme-tokens";
import { formatCurrencyBRL } from "@/utils/formatCurrencyBRL";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
	installmentsData: Array<InstallmentType>;
	checkbox?: boolean;
	onCheckboxChange?: (installment: Array<InstallmentType>) => void;
}

export const InstallmentList: React.FC<IProps> = ({ installmentsData, checkbox, onCheckboxChange }) => {
	const { clientStore } = useStore();
	const [_, setTotal] = useState(0);

	const handleCheckbox = (isChecked: boolean, index: number) => {
		let totalInstallmentsValue = 0;
		installmentsData.forEach((installment, indexInstallmentData) => {
			if ((isChecked && indexInstallmentData <= index) || (!isChecked && indexInstallmentData < index)) {
				totalInstallmentsValue += installment.value;
				installment.checkboxEnabled = true;
				installmentsData[indexInstallmentData] = installment;
			} else if (!isChecked) {
				installment.checkboxEnabled = false;
				installmentsData[indexInstallmentData] = installment;
			}
		});
		setTotal(totalInstallmentsValue);
		clientStore.setInstallmentsTotalValue(totalInstallmentsValue);
		if (onCheckboxChange) {
			onCheckboxChange(installmentsData);
		}
	};

	const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark);

	return (
		<>
			{installmentsData.map((installment, index) => (
				<Installment
					key={index}
					number={installment.number}
					date={installment.date}
					value={installment.value}
					onCheckboxChange={(isChecked) => handleCheckbox(isChecked, index)}
					checkboxEnabled={installment.checkboxEnabled}
					checkbox={checkbox}
				/>
			))}
			<Flex bg={formBackGround} p={"24px"} justifyContent={"space-between"} marginTop={"40px"} borderRadius={"8px"}>
				<Text fontWeight={"medium"}>Total</Text>
				<Text fontWeight={"medium"}>{formatCurrencyBRL(clientStore.installmentsTotalValue.value ?? 0)}</Text>
			</Flex>
		</>
	);
};
