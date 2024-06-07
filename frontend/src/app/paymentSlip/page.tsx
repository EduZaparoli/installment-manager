"use client";
import { useEffect, useState } from "react";
import { api } from "@/service/APIService";
import { useStore } from "@/stores/storeProvider";
import { Flex } from "@chakra-ui/react";

const PaymentSlip = () => {
	const { clientStore } = useStore();
	const [paymentSlipHtml, setPaymentSlipHtml] = useState("");
	const totalAmount = clientStore.installmentsTotalValue.value * 100;
	const customerInfo = { name: clientStore.client.value?.name, cpf: clientStore.client.value?.documentNumber };

	useEffect(() => {
		const fetchPaymentSlip = async () => {
			const response = await api.getPaymentSlip(totalAmount, customerInfo);
			setPaymentSlipHtml(response);
		};

		fetchPaymentSlip();
	}, []);

	return (
		<Flex pt={"100px"} width={"100%"} align={"center"} justify={"center"}>
			<div dangerouslySetInnerHTML={{ __html: paymentSlipHtml }} />
		</Flex>
	);
};

export default PaymentSlip;
