import { Card } from "@/components/atoms/Card";
import { useStore } from "@/stores/storeProvider";
import { formatDocumentNumber } from "@/utils/formatDocumentNumber";
import { formatCellphoneNumber } from "@/utils/formatPhoneNumber";
import { Box, Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

export const CustomerCard = observer(() => {
	const { clientStore } = useStore();

	return (
		<Card>
			<Flex alignItems={"center"} gap={"32px"} alignSelf={"stretch"} width={"100%"}>
				<Flex flexDirection={"column"} alignItems={"flex-start"} gap={"24px"} flex={"1 0 0"}>
					<Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"} gap={"16px"}>
						<Text fontSize={"24px"}>{clientStore.client.value?.name}</Text>
					</Flex>
					<Flex flexDirection={"row"} gap={"54px"}>
						<Box>
							<Text fontWeight={"medium"}>CPF:</Text>
							<Text>{formatDocumentNumber(clientStore.client.value?.documentNumber || "")}</Text>
						</Box>
						<Box>
							<Text fontWeight={"medium"}>E-mail:</Text>
							<Text>{clientStore.client.value?.email}</Text>
						</Box>
						<Box>
							<Text fontWeight={"medium"}>Telefone:</Text>
							<Text>{formatCellphoneNumber(clientStore.client.value?.cellPhone || "")}</Text>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
