"use client";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthStore } from "@/stores/AuthStore";
import { Container } from "@/components/atoms/Container";
import { LoginContainer } from "@/components/organisms/LoginContainer";

const Home = () => {
	const { fetchAccessToken } = new AuthStore();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onContinue = async () => {
		setIsSubmitted(true);

		if (!email || !password) {
			return;
		}

		setIsLoading(true);
		try {
			await fetchAccessToken(email, password);
			router.push("/searchUser");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Container align="center" justifyContent="space-between" navbar theme logo>
				<Flex height={"90vh"} alignItems={"center"} justifyContent={"center"}>
					<LoginContainer
						onContinue={onContinue}
						email={email}
						password={password}
						onEmail={setEmail}
						onPassword={setPassword}
						isLoading={isLoading}
						isSubmitted={isSubmitted}
					/>
				</Flex>
			</Container>
		</>
	);
};

export default Home;
