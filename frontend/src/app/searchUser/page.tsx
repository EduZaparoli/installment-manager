"use client";
import SearchUser from "@/components/templates/SearchUser";
import { useStore } from "@/stores/storeProvider";
import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SearchUserPage = observer(() => {
	const { clientStore } = useStore();
	const router = useRouter();
	const toast = useToast();

	useEffect(() => {
		clientStore.installments.value = [];
		clientStore.installmentsTotalValue.value = 0;
		localStorage.setItem("selectedProduct", "");
	}, []);

	const handleSearchUser = async (cpf: string) => {
		try {
			await clientStore.fetchGetClient(cpf);
			await clientStore.fetchClientAllPurchases(cpf);
			router.push("/selectInstallmentsAdvance");
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
		}
	};

	return <SearchUser onSearchUser={handleSearchUser} />;
});

export default SearchUserPage;
