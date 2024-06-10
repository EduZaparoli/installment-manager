import { themes } from "@/themes/theme-tokens";
import { mediaQuery } from "@/themes/use-media-query";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, WrapItem, useColorMode, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";

interface IProps {
	avatar?: React.ReactNode;
	theme?: React.ReactNode;
	logo?: React.ReactNode;
	justifyContent?: string;
}

export const Navbar = ({ avatar, theme, logo, justifyContent = "space-between" }: IProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark);
	const [isSmallScreen] = useMediaQuery(mediaQuery.isLaptopOrSmallScreen);

	return (
		<Flex
			height={"10vh"}
			alignItems={"center"}
			justifyContent={justifyContent}
			paddingLeft={16}
			paddingRight={16}
			background={formBackGround}
		>
			{logo && (
				<Box marginLeft={2}>
					<Flex alignSelf={"center"}>
						<Image src="/images/logo.png" alt="LOGO" width={isSmallScreen ? 32 : 48} height={isSmallScreen ? 8 : 12} />
					</Flex>
				</Box>
			)}
			<WrapItem alignItems={"center"}>
				{theme && (
					<Box>
						<Button
							boxShadow="base"
							paddingLeft={8}
							paddingRight={8}
							rounded="md"
							onClick={toggleColorMode}
							colorScheme="teal"
							size={isSmallScreen ? "xs" : "sm"}
						>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
					</Box>
				)}
				{avatar && (
					<Box paddingLeft={5} marginRight={2}>
						<Avatar
							size={isSmallScreen ? "sm" : "md"}
							name="Alberto Ferraz"
							src="https://i.pinimg.com/736x/f1/4f/00/f14f00c1f7e155220268ed7eb1f9487f.jpg"
							background={"gray.300"}
						/>
					</Box>
				)}
			</WrapItem>
		</Flex>
	);
};
