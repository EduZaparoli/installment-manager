"use client";
import { useStore } from "@/stores/storeProvider";
import { Flex } from "@chakra-ui/react";

const PaymentSlip = () => {
	const { clientStore } = useStore();

	return (
		<Flex pt={"100px"} width={"100%"} align={"center"} justify={"center"}>
			<div dangerouslySetInnerHTML={{ __html: clientStore.paymentSlip.value }} />
		</Flex>
	);
};

export default PaymentSlip;
