"use client";
import { Box, Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout";
import { ModalSearchUser } from "@/components/molecules/ModalSearchUser";
import { useState } from "react";

const SearchUser = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<ResponsiveLayout>
			<Grid justifyItems={"center"} alignItems={"center"} marginLeft={8} marginRight={8} height={"70%"}>
				<GridItem>
					<Stack gap={3} padding={"20px"}>
						<Text fontSize={"24px"}>Busque pelo CPF de um cliente</Text>
						<Text>Para acessar a área de atendimento, você precisa informar o CPF do cliente</Text>
					</Stack>
					<Box paddingLeft={"20px"} paddingTop={"8px"}>
						<Button colorScheme="teal" onClick={handleOpenModal}>
							Buscar CPF
						</Button>
					</Box>
					<ModalSearchUser modalTitle="Informe o CPF do cliente" showInput isOpen={isOpen} isClose={handleCloseModal} />
				</GridItem>
			</Grid>
		</ResponsiveLayout>
	);
};

export default SearchUser;
