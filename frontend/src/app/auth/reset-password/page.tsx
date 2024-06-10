"use client";
import { Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { LoginContainer } from "@/components/organisms/LoginContainer";
import { api } from "@/service/APIService";

const ResetPassword = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const toast = useToast();

	const onContinue = async () => {
		setIsSubmitted(true);

		if (!email || !password || !newPassword) {
			return;
		}

		setIsLoading(true);
		try {
			if (password === newPassword) {
				await api.resetPasswordUser(email, newPassword);
				router.push("/auth/login");
				toast({
					title: "Sucesso.",
					description: "A senha foi atualizada.",
					status: "success",
					duration: 5000,
					position: "top",
					isClosable: true,
				});
			} else {
				toast({
					title: "Erro.",
					description: "As senhas precisam ser iguais.",
					status: "error",
					duration: 5000,
					position: "top",
					isClosable: true,
				});
			}
		} catch (error) {
			console.log(error);
			toast({
				title: "Erro.",
				description: "Erro na redefinição de senha",
				status: "error",
				duration: 5000,
				position: "top",
				isClosable: true,
			});
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
						resetPassword
						email={email}
						password={password}
						newPassword={newPassword}
						onNewPassword={setNewPassword}
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

export default ResetPassword;
