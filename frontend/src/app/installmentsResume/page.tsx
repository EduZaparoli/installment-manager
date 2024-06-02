"use client";
import { ModalSearchUser } from "@/components/molecules/ModalSearchUser";
import { InstallmentList } from "@/components/organisms/InstallmentList";
import { CustomerSection } from "@/components/templates/CustomerSection";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { useStore } from "@/stores/storeProvider"; // Alterado para usar storeProvider
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const InstallmentsResume = () => {
	const router = useRouter();
	const { clientStore } = useStore();
	const selectedInstallments = clientStore.selectedInstallments;

	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const onBack = () => {
		clientStore.setInstallmentsTotalValue(0);
		router.push("/selectInstallmentsAdvance");
	};

	const installmentsData = selectedInstallments.value.map((installment) => ({
		number: installment.number,
		date: installment.date,
		value: installment.value,
	}));

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
			<ModalSearchUser modalTitle="Enviar boleto de pagamento" isOpen={isOpen} isClose={handleCloseModal} />
		</ResponsiveLayout>
	);
};

export default InstallmentsResume;
