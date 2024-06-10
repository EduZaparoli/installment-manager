"use client";
import { themes } from "@/themes/theme-tokens";
import { mediaQuery } from "@/themes/use-media-query";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
	isLoading: boolean;
	isSubmitted: boolean;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	onFirstName: (value: string) => void;
	onLastName: (value: string) => void;
	onEmail: (value: string) => void;
	onPassword: (value: string) => void;
	onContinue: () => void;
}

export const RegisterContainer = ({
	isLoading,
	isSubmitted,
	firstName,
	lastName,
	email,
	password,
	onFirstName,
	onLastName,
	onEmail,
	onPassword,
	onContinue,
}: IProps) => {
	const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark);
	const [isSmallScreen] = useMediaQuery(mediaQuery.isLaptopOrSmallScreen);
	const [showPasswod, setShowPassword] = useState(false);
	const handleClickPassword = () => setShowPassword(!showPasswod);

	return (
		<Flex
			shadow={"md"}
			direction={"column"}
			background={formBackGround}
			pt={16}
			pb={16}
			pe={24}
			pl={24}
			rounded={24}
			margin={5}
		>
			<Heading fontSize={isSmallScreen ? "30px" : "36px"} mb={6}>
				Cadastrar
			</Heading>
			<Input
				size={isSmallScreen ? "sm" : "md"}
				placeholder="Nome"
				variant={"filled"}
				mb={3}
				type="text"
				onChange={(e) => onFirstName(e.target.value)}
				value={firstName}
				isInvalid={isSubmitted && firstName === ""}
			/>
			<Input
				size={isSmallScreen ? "sm" : "md"}
				placeholder="Sobrenome"
				variant={"filled"}
				mb={3}
				type="text"
				onChange={(e) => onLastName(e.target.value)}
				value={lastName}
				isInvalid={isSubmitted && lastName === ""}
			/>
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
					placeholder="Senha"
					variant={"filled"}
					mb={6}
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
			<Button
				size={isSmallScreen ? "sm" : "md"}
				onClick={onContinue}
				colorScheme="teal"
				isLoading={isLoading}
				loadingText="Loading"
			>
				Cadastrar
			</Button>
			<Box alignSelf={"center"} paddingTop={"4"}>
				<Link fontSize={isSmallScreen ? "14px" : "16px"} href="/auth/login">
					Voltar
				</Link>
			</Box>
		</Flex>
	);
};
