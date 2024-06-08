"use client";
import SearchUser from "@/components/templates/SearchUser";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const SearchUserPage = observer(() => {
	const { clientStore } = useStore();

	useEffect(() => {
		clientStore.installments.value = [];
	}, []);

	return <SearchUser />;
});

export default SearchUserPage;
