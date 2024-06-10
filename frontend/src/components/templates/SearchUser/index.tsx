"use client";
import { Box, Button, Grid, GridItem, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { ModalSearchUser } from "@/components/molecules/ModalSearchUser";
import { useState } from "react";

interface IProps {
	onSearchUser(cpf: string): Promise<void>;
}

const SearchUser = ({ onSearchUser }: IProps) => {
	const [isSmallScreen] = useMediaQuery("(max-width: 1024px) and (max-height: 870px)");
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<ResponsiveLayout index={0}>
			<Grid justifyItems={"center"} alignItems={"center"} marginLeft={8} marginRight={8} height={"70%"}>
				<GridItem>
					<Stack gap={3} padding={"20px"}>
						<Text fontSize={isSmallScreen ? "18px" : "24px"}>Busque pelo CPF de um cliente</Text>
						<Text fontSize={isSmallScreen ? "14px" : "18px"}>
							Para acessar a área de atendimento, você precisa informar o CPF do cliente
						</Text>
					</Stack>
					<Box paddingLeft={"20px"} paddingTop={"8px"}>
						<Button colorScheme="teal" onClick={handleOpenModal} size={isSmallScreen ? "sm" : "md"}>
							Buscar CPF
						</Button>
					</Box>
					<ModalSearchUser
						modalTitle="Informe o CPF do cliente"
						showInput
						isOpen={isOpen}
						isClose={handleCloseModal}
						onSearchUser={onSearchUser}
					/>
				</GridItem>
			</Grid>
		</ResponsiveLayout>
	);
};

export default SearchUser;
