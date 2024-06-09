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
	onSearchUser?(cpf: string): Promise<void>;
}

export const ModalSearchUser = observer(
	({ isOpen, isClose, modalTitle, showInput = false, onSend, isLoadingResume, onSearchUser }: IProps) => {
		const formBackGround = useColorModeValue(
			themes.colors.primary.mainprimaryLight,
			themes.colors.primary.mainPrimaryDark,
		);
		const [documentNumber, setDocumentNumber] = useState("");
		const [isLoading, setIsLoading] = useState(false);
		const toast = useToast();

		const handleUser = async () => {
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
				isClose(); // Fecha o modal após a busca
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
								<Text>Digite o CPF do cliente que deseja buscar</Text>
								<Input
									value={documentNumber}
									onChange={(event) => setDocumentNumber(event.target.value)}
									placeholder="CPF do cliente"
								/>
							</Stack>
						) : (
							<Stack gap={"5px"}>
								<Text>O boleto de pagamento vai ser enviado para o e-mail: </Text>
								<Text fontWeight={"medium"}>{/* Renderizar email do cliente aqui */}</Text>
							</Stack>
						)}
					</ModalBody>

					<ModalFooter>
						{showInput ? (
							<Button colorScheme="teal" onClick={handleUser} mr={3} isLoading={isLoading} loadingText="Buscar">
								Buscar
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
