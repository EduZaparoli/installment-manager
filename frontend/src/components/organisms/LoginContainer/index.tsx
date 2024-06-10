"use client";
import { themes } from "@/themes/theme-tokens";
import { mediaQuery } from "@/themes/use-media-query";
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	useColorModeValue,
	useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";

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
	const [isSmallScreen] = useMediaQuery(mediaQuery.isLaptopOrSmallScreen);
	const [showPasswod, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPasswod] = useState(false);
	const handleClickPassword = () => setShowPassword(!showPasswod);
	const handleClickNewPassword = () => setShowNewPasswod(!showNewPassword);

	return (
		<Flex shadow={"md"} direction={"column"} background={formBackGround} p={24} rounded={24} margin={5}>
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
			<InputGroup size="md">
				<Input
					size={isSmallScreen ? "sm" : "md"}
					placeholder={resetPassword ? "Nova Senha" : "Senha"}
					variant={"filled"}
					mb={resetPassword ? 3 : 6}
					type={showPasswod ? "text" : "password"}
					onChange={(e) => onPassword(e.target.value)}
					value={password}
					isInvalid={isSubmitted && password === ""}
				/>
				<InputRightElement width="4.5rem">
					<Button variant={"unstyled"} h="1.75rem" size="sm" onClick={handleClickPassword}>
						{showPasswod ? <ViewOffIcon /> : <ViewIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>
			{resetPassword && (
				<InputGroup size="md">
					<Input
						size={isSmallScreen ? "sm" : "md"}
						placeholder="Nova Senha"
						variant={"filled"}
						mb={6}
						type={showNewPassword ? "text" : "password"}
						onChange={(e) => onNewPassword && onNewPassword(e.target.value)}
						value={newPassword}
						isInvalid={isSubmitted && newPassword === ""}
					/>
					<InputRightElement width="4.5rem">
						<Button variant={"unstyled"} h="1.75rem" size="sm" onClick={handleClickNewPassword}>
							{showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
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
