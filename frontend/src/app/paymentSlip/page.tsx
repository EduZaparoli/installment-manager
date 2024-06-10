"use client";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/storeProvider";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { themes } from "@/themes/theme-tokens";
import { ModalSearchUser } from "@/components/molecules/ModalSearchUser";
import { formatCurrencyBRL } from "@/utils/formatCurrencyBRL";
import { TypePaymentSliptEnum } from "@/enum/installment";

interface PaymentSlip {
	id: number;
	barCode: string;
	dueDate: string;
	issuanceDate: string;
	html: string;
	value: number;
	payer: string;
	documentNumber: string;
	status: string;
	paymentDate?: string;
}

const PaymentSlipsPage = observer(() => {
	const { clientStore } = useStore();
	const [paymentSlips, setPaymentSlips] = useState<PaymentSlip[]>([]);
	const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark);
	const [isOpen, setIsOpen] = useState(false);
	const toast = useToast();

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const fetchPaymentSlips = async () => {
		try {
			await clientStore.fetchPaymentSlips();
			setPaymentSlips(clientStore.paymentSlips.value);
		} catch (error) {
			toast({
				title: "Erro.",
				description: "Erro ao carregar boletos.",
				status: "error",
				duration: 5000,
				position: "top",
				isClosable: true,
			});
			setPaymentSlips([]);
		}
	};

	useEffect(() => {
		fetchPaymentSlips();
	}, [clientStore, toast]);

	const handleView = (slipHtml: string) => {
		const newWindow = window.open();
		if (newWindow) {
			newWindow.document.write(slipHtml);
		}
	};

	const handleDownload = async (slipId: number) => {
		try {
			const pdf = await clientStore.downloadPaymentSlip(slipId);
			const blob = new Blob([pdf], { type: "application/pdf" });
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = `boleto_${slipId}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			toast({
				title: "Erro.",
				description: "Erro ao baixar o boleto.",
				status: "error",
				duration: 5000,
				position: "top",
				isClosable: true,
			});
		}
	};

	const handleSearchUser = async (cpf: string) => {
		try {
			await clientStore.fetchGetClient(cpf);
			await clientStore.fetchClientAllPurchases(cpf);
			await fetchPaymentSlips();
			handleCloseModal();
		} catch (error) {
			console.log(error);
			toast({
				title: "Erro.",
				description: "Cliente não encontrado.",
				status: "error",
				duration: 5000,
				position: "top",
				isClosable: true,
			});
			setPaymentSlips([]);
		}
	};

	return (
		<ResponsiveLayout index={1}>
			<Flex pt={"100px"} width={"100%"} align={"center"} justify={"center"} flexDirection={"column"}>
				<Box width={"80%"} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={formBackGround}>
					<Heading as="h1" size="lg" mb={4}>
						Boletos do Cliente
					</Heading>
					<Box as="p" pb={"20px"}>
						<Text fontWeight={"medium"}>Nome: {clientStore.client.value.name}</Text>
					</Box>

					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Status</Th>
								<Th>Data de Emissão</Th>
								<Th>Data de Vencimento</Th>
								<Th>Valor</Th>
								<Th>Ações</Th>
							</Tr>
						</Thead>
						{paymentSlips.length === 0 ? (
							<Tbody>
								<Tr>
									<Td colSpan={6}>
										<Center pt={"20px"}>
											<Text>Nenhum boleto encontrado.</Text>
										</Center>
									</Td>
								</Tr>
							</Tbody>
						) : (
							<Tbody>
								{paymentSlips.map((slip) => (
									<Tr key={slip.id}>
										<Td>{slip.id}</Td>
										<Td fontWeight={"medium"} color={slip.status === TypePaymentSliptEnum.STATUS_CREATE ? "" : "green"}>
											{slip.status}
										</Td>
										<Td>{new Date(slip.issuanceDate).toLocaleDateString()}</Td>
										<Td>{new Date(slip.dueDate).toLocaleDateString()}</Td>
										<Td>{formatCurrencyBRL(slip.value)}</Td>
										<Td>
											<Button colorScheme="teal" size="sm" mr={2} onClick={() => handleView(slip.html)}>
												Exibir
											</Button>
											<Button colorScheme="teal" size="sm" onClick={() => handleDownload(slip.id)}>
												Baixar PDF
											</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						)}
					</Table>
				</Box>
				<Box paddingTop={"50px"}>
					<Button colorScheme="teal" onClick={handleOpenModal}>
						Buscar CPF
					</Button>
				</Box>
			</Flex>
			<ModalSearchUser
				modalTitle="Informe o CPF do cliente"
				showInput
				isOpen={isOpen}
				isClose={handleCloseModal}
				onSearchUser={handleSearchUser}
			/>
		</ResponsiveLayout>
	);
});

export default PaymentSlipsPage;
