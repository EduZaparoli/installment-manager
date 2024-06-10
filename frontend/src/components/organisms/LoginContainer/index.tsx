"use client";
import { themes } from "@/themes/theme-tokens";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Input, Link, useColorModeValue, useMediaQuery } from "@chakra-ui/react";

interface IProps {
	resetPassword?: boolean;
	email: string;
	password: string;
	newPassword?: string;
	onEmail: (value: string) => void;
	onPassword: (value: string) => void;
	onNewPassword?: (value: string) => void;
	onContinue: () => void;
	isLoading: boolean;
	isSubmitted: boolean;
}

export const LoginContainer = ({
	resetPassword = false,
	email,
	password,
	newPassword,
	onEmail,
	onPassword,
	onNewPassword,
	onContinue,
	isLoading,
	isSubmitted,
}: IProps) => {
	const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark);
	const [isSmallScreen] = useMediaQuery("(max-width: 1024px) and (max-height: 870px)");

	return (
		<Flex direction={"column"} background={formBackGround} p={24} rounded={24} margin={5}>
			<Heading fontSize={isSmallScreen ? "30px" : "36px"} mb={6}>
				{resetPassword ? "Redefinir Senha" : "Log in"}
			</Heading>
			<Input
				size={isSmallScreen ? "sm" : "md"}
				placeholder="E-mail"
				variant={"filled"}
				mb={3}
				type="email"
				onChange={(e) => onEmail(e.target.value)}
				value={email}
				isInvalid={isSubmitted && email === ""}
			/>
			<Input
				size={isSmallScreen ? "sm" : "md"}
				placeholder={resetPassword ? "Nova Senha" : "Senha"}
				variant={"filled"}
				mb={resetPassword ? 3 : 6}
				type="password"
				onChange={(e) => onPassword(e.target.value)}
				value={password}
				isInvalid={isSubmitted && password === ""}
			/>
			{resetPassword && (
				<Input
					size={isSmallScreen ? "sm" : "md"}
					placeholder="Nova Senha"
					variant={"filled"}
					mb={6}
					type="password"
					onChange={(e) => onNewPassword && onNewPassword(e.target.value)}
					value={newPassword}
					isInvalid={isSubmitted && newPassword === ""}
				/>
			)}
			<Button
				size={isSmallScreen ? "sm" : "md"}
				onClick={onContinue}
				colorScheme="teal"
				rightIcon={resetPassword ? undefined : <ArrowForwardIcon />}
				isLoading={isLoading}
				loadingText="Loading"
			>
				{resetPassword ? "Redefinir" : "Log in"}
			</Button>
			<Flex alignSelf={"center"} paddingTop={"4"} direction={"column"} align={"center"} gap={2}>
				{resetPassword ? (
					<Link fontSize={isSmallScreen ? "14px" : "16px"} href="/auth/login">
						Voltar
					</Link>
				) : (
					<Flex alignSelf={"center"} paddingTop={"4"} direction={"column"} align={"center"} gap={2}>
						<Link fontSize={isSmallScreen ? "14px" : "16px"} href="/auth/reset-password">
							Esqueci minha senha
						</Link>
						<Link fontSize={isSmallScreen ? "14px" : "16px"} href="/auth/register">
							Cadastrar
						</Link>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};
