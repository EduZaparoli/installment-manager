import { api } from "@/service/APIService";
import { useStore } from "@/stores/storeProvider";
import { themes } from "@/themes/theme-tokens";
import { isValidCPF } from "@/utils/isValidCPF";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface IProps {
	isLoadingResume?: boolean;
	onSend?(): void;
	isOpen: boolean;
	isClose(): void;
	modalTitle: string;
	showInput?: boolean;
	admin?: boolean;
	onSearchUser?(cpf: string): Promise<void>;
}

export const ModalSearchUser = observer(
	({
		isOpen,
		isClose,
		modalTitle,
		showInput = false,
		admin = false,
		onSend,
		isLoadingResume,
		onSearchUser,
	}: IProps) => {
		const formBackGround = useColorModeValue(
			themes.colors.primary.mainprimaryLight,
			themes.colors.primary.mainPrimaryDark,
		);
		const [documentNumber, setDocumentNumber] = useState("");
		const [adminCode, setAdminCode] = useState("");
		const [isLoading, setIsLoading] = useState(false);
		const toast = useToast();
		const { clientStore } = useStore();

		const handleUser = async () => {
			if (admin) {
				clientStore.setAdminCode(adminCode);
				await onSearchUser?.(adminCode);
				return;
			} else {
				if (!isValidCPF(documentNumber)) {
					toast({
						title: "Erro",
						description: "CPF inválido. Por favor, insira um CPF válido.",
						status: "error",
						duration: 5000,
						position: "top",
						isClosable: true,
					});
					return;
				}

				setIsLoading(true);
				try {
					await onSearchUser?.(documentNumber);
					isClose();
				} catch (error) {
					toast({
						title: "Erro",
						description: "Cliente não encontrado ou ocorreu um erro na busca.",
						status: "error",
						duration: 5000,
						position: "top",
						isClosable: true,
					});
					console.log(error);
				} finally {
					setIsLoading(false);
				}
			}
		};

		return (
			<Modal closeOnEsc size={"md"} isCentered isOpen={isOpen} onClose={isClose}>
				<ModalOverlay />
				<ModalContent bgColor={formBackGround}>
					<ModalHeader>{modalTitle}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{showInput ? (
							<Stack gap={5}>
								<Text>
									{admin
										? "Digite seu código de administrador para cadastrar o funcionário"
										: "Digite o CPF do cliente que deseja buscar"}
								</Text>
								<Input
									value={admin ? adminCode : documentNumber}
									onChange={(event) =>
										admin ? setAdminCode(event.target.value) : setDocumentNumber(event.target.value)
									}
									placeholder={admin ? "Código" : "CPF do cliente"}
								/>
							</Stack>
						) : (
							<Stack gap={"5px"}>
								<Text>O boleto de pagamento vai ser enviado para o e-mail: </Text>
								<Text fontWeight={"medium"}>{clientStore.client.value.email}</Text>
							</Stack>
						)}
					</ModalBody>

					<ModalFooter>
						{showInput ? (
							<Button colorScheme="teal" onClick={handleUser} mr={3} isLoading={isLoading} loadingText="Buscar">
								{admin ? "Continuar" : "Buscar"}
							</Button>
						) : (
							<Button colorScheme="teal" onClick={onSend} mr={3} isLoading={isLoadingResume} loadingText="Enviar">
								Enviar
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	},
);
