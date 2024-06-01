"use client";
import { InstallmentList } from "@/components/organisms/InstallmentList";
import { CustomerSection } from "@/components/templates/CustomerSection";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface InstallmentType {
	number: number;
	date: string;
	value: number;
	checkboxEnabled?: boolean;
}

const SelectInstallmentsAdvancePage = observer(() => {
	const [isDisabled, setIsDisabled] = useState(true);

	const router = useRouter();

	const onContinue = () => {
		router.push("/installmentsResume");
	};

	const onBack = () => {
		router.push("/searchUser");
	};

	const installments = [
		{
			number: 2,
			date: "dd/mm/aaaa",
			value: 100,
		},
		{
			number: 3,
			date: "dd/mm/aaaa",
			value: 200,
		},
		{
			number: 4,
			date: "dd/mm/aaaa",
			value: 300,
		},
	];

	const [installmentsData, setInstallmentsData] = useState<InstallmentType[] | []>(installments);

	const handleCheckboxChange = (installments: Array<InstallmentType>) => {
		setInstallmentsData(installments);
		if (installments.find((installments) => installments.checkboxEnabled)) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	return (
		<ResponsiveLayout>
			<CustomerSection customer={{ dropdown: true }} />
			<Flex flexDirection={"column"} w={"100%"} align={"center"} alignSelf={"center"} margin={"40px 0 104px 0"}>
				<Box width={"40%"}>
					<Text paddingBottom={"20px"} fontSize={"24px"}>
						Selecione as parcelas
					</Text>
					<InstallmentList
						installmentsData={installmentsData}
						checkbox
						totalValue
						onCheckboxChange={handleCheckboxChange}
					/>
					<Flex gap={"16px"} flexDirection={"row"} marginTop={"40px"}>
						<Button colorScheme={"teal"} onClick={onBack}>
							Voltar
						</Button>
						<Button colorScheme={"teal"} disabled={isDisabled} onClick={onContinue}>
							Continuar
						</Button>
					</Flex>
				</Box>
			</Flex>
		</ResponsiveLayout>
	);
});

export default SelectInstallmentsAdvancePage;
