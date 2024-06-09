"use client";
import { InstallmentList } from "@/components/organisms/InstallmentList";
import { CustomerSection } from "@/components/templates/CustomerSection";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { TypeInstallmentEnum } from "@/enum/installment";
import { useStore } from "@/stores/storeProvider";
import { themes } from "@/themes/theme-tokens";
import { Box, Button, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export interface InstallmentType {
	purchaseId: number;
	number: number;
	date: string;
	value: number;
	checkboxEnabled?: boolean;
}

const SelectInstallmentsAdvancePage = observer(() => {
	const router = useRouter();
	const { clientStore } = useStore();
	const [isDisabled, setIsDisabled] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
	const [installmentsData, setInstallmentsData] = useState<InstallmentType[]>([]);
	const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark);

	const onContinue = () => {
		clientStore.setSelectedInstallments(installmentsData.filter((inst) => inst.checkboxEnabled));
		router.push("/installmentsResume");
	};

	const onBack = () => {
		router.push("searchUser");
	};

	const productNames = clientStore.allPurchases.value.flatMap((purchase) =>
		purchase.products.map((product) => ({
			id: product.product.id,
			name: product.product.name,
		})),
	);

	useEffect(() => {
		const mappedInstallments: InstallmentType[] = clientStore.installments.value
			.filter((installment) => installment.status !== TypeInstallmentEnum.STATUS_PENDING)
			.map((installment) => ({
				purchaseId: installment.purchaseId,
				number: installment.installmentNumber,
				date: new Date(installment.dueDate).toLocaleDateString(),
				value: installment.installmentValue,
				status: installment.status,
			}));
		setInstallmentsData(mappedInstallments);
	}, [clientStore.installments.value]);

	useEffect(() => {
		if (selectedProduct !== null) {
			clientStore.fetchClientInstallmentsByProduct(selectedProduct);
		}
	}, [selectedProduct]);

	useEffect(() => {
		const savedProduct = localStorage.getItem("selectedProduct");
		if (savedProduct) {
			setSelectedProduct(parseInt(savedProduct, 10));
		}
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const productId = parseInt(event.target.value, 10);
		setSelectedProduct(productId);
		localStorage.setItem("selectedProduct", productId.toString());
		setInstallmentsData([]);
		setIsDisabled(true);
	};

	const handleCheckboxChange = (installments: Array<InstallmentType>) => {
		setInstallmentsData(installments);
		if (installments.find((installment) => installment.checkboxEnabled)) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	return (
		<ResponsiveLayout>
			<CustomerSection />
			<Flex flexDirection={"column"} w={"100%"} align={"center"} alignSelf={"center"} margin={"40px 0 104px 0"}>
				<Box width={"40%"}>
					<Text paddingBottom={"20px"} fontSize={"24px"}>
						Selecione o produto e as parcelas
					</Text>
					<Box pb={"20px"}>
						<Select
							background={formBackGround}
							variant="outline"
							placeholder="Selecione um produto"
							onChange={handleChange}
							value={selectedProduct !== null ? selectedProduct.toString() : ""}
						>
							{productNames.map((product) => (
								<option key={product.id} value={product.id.toString()}>
									{product.name}
								</option>
							))}
						</Select>
					</Box>
					<InstallmentList installmentsData={installmentsData} checkbox onCheckboxChange={handleCheckboxChange} />
					<Flex gap={"16px"} flexDirection={"row"} marginTop={"40px"}>
						<Button colorScheme={"teal"} onClick={onBack}>
							Voltar
						</Button>
						<Button colorScheme={"teal"} onClick={onContinue} isDisabled={isDisabled}>
							Continuar
						</Button>
					</Flex>
				</Box>
			</Flex>
		</ResponsiveLayout>
	);
});

export default SelectInstallmentsAdvancePage;
