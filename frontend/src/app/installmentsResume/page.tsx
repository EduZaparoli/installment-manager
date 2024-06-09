"use client";
import { ModalSearchUser } from "@/components/molecules/ModalSearchUser";
import { InstallmentList } from "@/components/organisms/InstallmentList";
import { CustomerSection } from "@/components/templates/CustomerSection";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { TypeInstallmentEnum } from "@/enum/installment";
import { api } from "@/service/APIService";
import { useStore } from "@/stores/storeProvider";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const InstallmentsResume = () => {
	const router = useRouter();
	const { clientStore } = useStore();
	const selectedInstallments = clientStore.selectedInstallments.value;
	const totalAmount = clientStore.installmentsTotalValue.value;
	const customer = clientStore.client.value;
	const [isOpen, setIsOpen] = useState(false);
	const [isLoadingResume, setIsLoadingResume] = useState(false);
	const [disable, setDisable] = useState(false);

	const installmentsData = selectedInstallments.map((installment) => ({
		purchaseId: installment.purchaseId,
		number: installment.number,
		date: installment.date,
		value: installment.value,
	}));

	useEffect(() => {
		if (clientStore.installmentsTotalValue.value === 0) {
			setDisable(true);
		}
	}, [clientStore.installmentsTotalValue.value]);

	const customerInfo = {
		name: customer.name,
		cpf: customer.documentNumber,
		email: customer.email,
		address: {
			street: customer.address.street,
			number: customer.address.number,
			neighborhood: customer.address.neighborhood,
			city: customer.address.city,
			state: customer.address.state,
			postalCode: customer.address.postalCode,
		},
		installments: installmentsData,
	};

	const handleOpenModal = async () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleConfirm = async () => {
		const purchaseId = selectedInstallments[0]?.purchaseId;
		const installmentNumbers = selectedInstallments.map((installment) => installment.number);
		const status = TypeInstallmentEnum.STATUS_PENDING;
		setIsLoadingResume(true);

		try {
			await api.updateInstallments(purchaseId, installmentNumbers, status);
			await clientStore.fetchPaymentSlip(totalAmount, customerInfo);
			onBack();
		} catch (error) {
			console.error("Error updating installments:", error);
		} finally {
			setIsLoadingResume(false);
		}
	};

	const onBack = () => {
		clientStore.setInstallmentsTotalValue(0);
		clientStore.selectedInstallments.value = [];
		router.push("selectInstallmentsAdvance");
	};

	return (
		<ResponsiveLayout>
			<CustomerSection />
			<Flex flexDirection={"column"} w={"100%"} align={"center"} alignSelf={"center"} margin={"40px 0 104px 0"}>
				<Box width={"40%"}>
					<Text paddingBottom={"20px"} fontSize={"24px"}>
						Resumo das parcelas
					</Text>
					<InstallmentList installmentsData={installmentsData} />
					<Flex gap={"16px"} flexDirection={"row"} marginTop={"40px"}>
						<Button colorScheme={"teal"} onClick={onBack}>
							Voltar
						</Button>
						<Button colorScheme={"teal"} onClick={handleOpenModal} isDisabled={disable}>
							Confirmar
						</Button>
					</Flex>
				</Box>
			</Flex>
			<ModalSearchUser
				isLoadingResume={isLoadingResume}
				modalTitle="Enviar boleto de pagamento"
				isOpen={isOpen}
				isClose={handleCloseModal}
				onSend={handleConfirm}
			/>
		</ResponsiveLayout>
	);
};

export default InstallmentsResume;
