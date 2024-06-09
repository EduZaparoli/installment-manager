"use client";
import { useStore } from "@/stores/storeProvider";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const PaymentSlip = () => {
	const { clientStore } = useStore();

	useEffect(() => {
		clientStore.selectedInstallments.value = [];
		clientStore.installmentsTotalValue.value = 0;
	}, []);

	return (
		<Flex pt={"100px"} width={"100%"} align={"center"} justify={"center"}>
			<div dangerouslySetInnerHTML={{ __html: clientStore.paymentSlip.value }} />
		</Flex>
	);
};

export default PaymentSlip;
