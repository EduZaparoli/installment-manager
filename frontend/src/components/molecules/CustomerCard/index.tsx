import { Card } from "@/components/atoms/Card";
import { useStore } from "@/stores/storeProvider";
import { formatDocumentNumber } from "@/utils/formatDocumentNumber";
import { formatCellphoneNumber } from "@/utils/formatPhoneNumber";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

export const CustomerCard = observer(() => {
	const [isSmallScreen] = useMediaQuery("(max-width: 1024px) and (max-height: 870px)");
	const { clientStore } = useStore();
	const customer = clientStore.client.value;

	return (
		<Card>
			<Flex alignItems={"center"} gap={"32px"} alignSelf={"stretch"} width={"100%"}>
				<Flex flexDirection={"column"} alignItems={"flex-start"} gap={"24px"} flex={"1 0 0"}>
					<Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"} gap={"16px"}>
						<Text fontSize={isSmallScreen ? "18px" : "24px"}>{customer.name}</Text>
					</Flex>
					<Flex flexDirection={"row"} gap={"54px"}>
						<Box>
							<Text fontSize={isSmallScreen ? "14px" : "16px"} fontWeight={"medium"}>
								CPF:
							</Text>
							<Text fontSize={isSmallScreen ? "14px" : "16px"}>{formatDocumentNumber(customer.documentNumber)}</Text>
						</Box>
						<Box>
							<Text fontSize={isSmallScreen ? "14px" : "16px"} fontWeight={"medium"}>
								E-mail:
							</Text>
							<Text fontSize={isSmallScreen ? "14px" : "16px"}>{customer.email}</Text>
						</Box>
						<Box>
							<Text fontSize={isSmallScreen ? "14px" : "16px"} fontWeight={"medium"}>
								Telefone:
							</Text>
							<Text fontSize={isSmallScreen ? "14px" : "16px"}>{formatCellphoneNumber(customer.cellPhone)}</Text>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
});
