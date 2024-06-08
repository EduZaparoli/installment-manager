import { Box, useColorModeValue } from "@chakra-ui/react";
import { Navbar } from "../../organisms/Navbar";
import { themes } from "@/themes/theme-tokens";

interface IProps {
	children: React.ReactNode;
	align?: string;
	justifyContent?: string;
	navbar?: boolean;
	avatar?: React.ReactNode;
	theme?: React.ReactNode;
	logo?: boolean;
}

export const Container = ({
	children,
	align,
	justifyContent,
	navbar = false,
	avatar = false,
	theme = false,
	logo = false,
}: IProps) => {
	const formBackGround = useColorModeValue(
		themes.colors.primary.mainprimaryLight,
		themes.colors.primary.mainPrimaryDark,
	);

	return (
		<>
			{navbar && <Navbar logo={logo} avatar={avatar} theme={theme} justifyContent={justifyContent} />}
			<Box bg={formBackGround} alignItems={align}>
				{children}
			</Box>
		</>
	);
};
