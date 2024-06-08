import { Card } from "@/components/atoms/Card";
import { useStore } from "@/stores/storeProvider";
import { formatDocumentNumber } from "@/utils/formatDocumentNumber";
import { formatCellphoneNumber } from "@/utils/formatPhoneNumber";
import { Box, Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

export const CustomerCard = observer(() => {
	const { clientStore } = useStore();
	const customer = clientStore.client.value;

	return (
		<Card>
			<Flex alignItems={"center"} gap={"32px"} alignSelf={"stretch"} width={"100%"}>
				<Flex flexDirection={"column"} alignItems={"flex-start"} gap={"24px"} flex={"1 0 0"}>
					<Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"} gap={"16px"}>
						<Text fontSize={"24px"}>{customer.name}</Text>
					</Flex>
					<Flex flexDirection={"row"} gap={"54px"}>
						<Box>
							<Text fontWeight={"medium"}>CPF:</Text>
							<Text>{formatDocumentNumber(customer.documentNumber)}</Text>
						</Box>
						<Box>
							<Text fontWeight={"medium"}>E-mail:</Text>
							<Text>{customer.email}</Text>
						</Box>
						<Box>
							<Text fontWeight={"medium"}>Telefone:</Text>
							<Text>{formatCellphoneNumber(customer.cellPhone)}</Text>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
