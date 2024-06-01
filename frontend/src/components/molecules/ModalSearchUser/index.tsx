import { useStore } from "@/stores/storeProvider";
import { themes } from "@/themes/theme-tokens";
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
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
	isOpen: boolean;
	isClose(): void;
	modalTitle: string;
	showInput?: boolean;
}

export const ModalSearchUser = observer(({ isOpen, isClose, modalTitle, showInput = false }: IProps) => {
	const formBackGround = useColorModeValue(
		themes.colors.primary.mainprimaryLight,
		themes.colors.primary.mainPrimaryDark,
	);
	const { clientStore } = useStore();
	const [documentNumber, setDocumentNumber] = useState("");
	const [email] = useState("edu@gmail.com");
	const router = useRouter();

	const handleUser = async () => {
		try {
			await clientStore.fetchGetClient(documentNumber);
			router.push("/selectInstallmentsAdvance");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Modal closeOnEsc size={"md"} isCentered isOpen={isOpen} onClose={isClose}>
				<ModalOverlay />
				<ModalContent bgColor={formBackGround}>
					<ModalHeader>{modalTitle}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{showInput && (
							<Stack gap={5}>
								<Text>Digite o CPF do cliente que deseja buscar</Text>
								<Input
									value={documentNumber}
									onChange={(event) => setDocumentNumber(event.target.value)}
									placeholder="CPF do cliente"
								/>
							</Stack>
						)}
						{!showInput && (
							<Stack gap={"5px"}>
								<Text>O boleto de pagamento vai ser enviado para o e-mail: </Text>
								<Text fontWeight={"medium"}>{email}</Text>
							</Stack>
						)}
					</ModalBody>

					<ModalFooter>
						{showInput && (
							<Button colorScheme="teal" onClick={handleUser} mr={3}>
								Buscar
							</Button>
						)}
						{!showInput && (
							<Button colorScheme="teal" onClick={handleUser} mr={3}>
								Enviar
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
