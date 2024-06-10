import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	Image,
	Stack,
	Tab,
	TabList,
	Tabs,
	Text,
	useColorMode,
	useColorModeValue,
	useMediaQuery,
} from "@chakra-ui/react";
import { AuthStore } from "../../../stores/AuthStore";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/organisms/Navbar";
import { themes } from "@/themes/theme-tokens";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { mediaQuery } from "@/themes/use-media-query";

interface IProps {
	children: React.ReactNode;
	index?: number;
}

export const ResponsiveLayout = ({ children, index }: IProps) => {
	const { isAuthenticated, logout } = new AuthStore();
	const router = useRouter();
	const formBackGround = useColorModeValue(
		themes.colors.secondary.secondaryLight,
		themes.colors.secondary.secondaryDark,
	);
	const mainContainerColor = useColorModeValue(
		themes.colors.primary.mainprimaryLight,
		themes.colors.primary.mainPrimaryDark,
	);
	const { colorMode, toggleColorMode } = useColorMode();
	const [isSmallScreen] = useMediaQuery(mediaQuery.isLaptopOrSmallScreen);

	if (!isAuthenticated) {
		router.push("/auth/login");
	}

	const userLogout = () => {
		logout();
		router.push("/auth/login");
	};

	return (
		<Grid
			templateAreas={`"nav header" "nav main"`}
			gridTemplateRows={"10vh 1fr"}
			gridTemplateColumns={"20vh 1fr"}
			height={"100vh"}
		>
			<GridItem height={"100vh"} area={"header"}>
				<Navbar avatar justifyContent="flex-end" />
			</GridItem>
			<GridItem
				background={formBackGround}
				area={"nav"}
				display={"flex"}
				justifyContent={"space-between"}
				flexDirection={"column"}
				paddingTop={26.9}
			>
				<Stack gap={20}>
					<Flex alignSelf={"center"}>
						<Image
							src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
							alt="LOGO"
							width={isSmallScreen ? 8 : 12}
						/>
					</Flex>
				</Stack>
				<Box>
					<Tabs
						background={formBackGround}
						colorScheme="teal"
						align="center"
						gap={"50px"}
						size={isSmallScreen ? "sm" : "lg"}
						index={index}
					>
						<TabList flexDirection={"column"}>
							<Tab>
								<Link href={"searchUser"}>Buscar Cliente</Link>
							</Tab>
						</TabList>
						<TabList>
							<Tab>
								<Link href={"paymentSlip"}>Boletos</Link>
							</Tab>
						</TabList>
					</Tabs>
				</Box>
				<Center paddingBottom={20}>
					<Stack align={"center"} gap={12}>
						<Text fontSize={isSmallScreen ? 16 : 24}>ParcelAdmin</Text>
						<Stack gap={3}>
							<Button
								colorScheme="teal"
								size={isSmallScreen ? "xs" : "sm"}
								onClick={toggleColorMode}
								boxShadow="base"
								p="1"
								rounded="md"
							>
								{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
							</Button>
							<Button
								colorScheme="teal"
								size={isSmallScreen ? "xs" : "sm"}
								onClick={userLogout}
								boxShadow="base"
								paddingLeft={8}
								paddingRight={8}
								rounded="md"
							>
								Sair
							</Button>
						</Stack>
					</Stack>
				</Center>
			</GridItem>
			<GridItem area={"main"} background={mainContainerColor}>
				{children}
			</GridItem>
		</Grid>
	);
};
