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
import { useState } from "react";

const InstallmentsResume = () => {
	const router = useRouter();
	const { clientStore } = useStore();
	const selectedInstallments = clientStore.selectedInstallments.value;

	const installmentsData = selectedInstallments.map((installment) => ({
		purchaseId: installment.purchaseId,
		number: installment.number,
		date: installment.date,
		value: installment.value,
	}));

	const totalAmount = clientStore.installmentsTotalValue.value;
	const customerInfo = {
		name: clientStore.client.value.name,
		cpf: clientStore.client.value.documentNumber,
		email: clientStore.client.value.email,
		address: {
			street: clientStore.client.value.address.street,
			number: clientStore.client.value.address.number,
			neighborhood: clientStore.client.value.address.neighborhood,
			city: clientStore.client.value.address.city,
			state: clientStore.client.value.address.state,
			postalCode: clientStore.client.value.address.postalCode,
		},
		installments: installmentsData,
	};

	const [isOpen, setIsOpen] = useState(false);

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

		try {
			await api.updateInstallments(purchaseId, installmentNumbers, status);
			await clientStore.fetchPaymentSlip(totalAmount, customerInfo);
		} catch (error) {
			console.error("Error updating installments:", error);
		} finally {
			router.push("/paymentSlip");
		}
	};

	const onBack = () => {
		clientStore.setInstallmentsTotalValue(0);
		router.push("/selectInstallmentsAdvance");
	};

	return (
		<ResponsiveLayout>
			<CustomerSection customer={{ dropdown: true }} />
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
						<Button colorScheme={"teal"} onClick={handleOpenModal}>
							Confirmar
						</Button>
					</Flex>
				</Box>
			</Flex>
			<ModalSearchUser
				modalTitle="Enviar boleto de pagamento"
				isOpen={isOpen}
				isClose={handleCloseModal}
				onSend={handleConfirm}
			/>
		</ResponsiveLayout>
	);
};

export default InstallmentsResume;
