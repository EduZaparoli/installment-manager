import { Button, Center, Flex, Grid, GridItem, Image, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AuthStore } from "../../../stores/AuthStore";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/organisms/Navbar";
import { themes } from "@/themes/theme-tokens";

interface IProps {
    children: React.ReactNode;
}

export const ResponsiveLayout = ({ children }: IProps) => {
    const { isAuthenticated, logout } = new AuthStore();
    const router = useRouter();
    const formBackGround = useColorModeValue(themes.colors.secondary.secondaryLight, themes.colors.secondary.secondaryDark)
    const mainContainerColor = useColorModeValue(themes.colors.primary.mainprimaryLight, themes.colors.primary.mainPrimaryDark)
    const { colorMode, toggleColorMode } = useColorMode()

    if (!isAuthenticated) {
        router.push('/auth/login');
    }

    const userLogout = () => {
        logout();
        router.push('/auth/login')
    }

    return (
        <Grid
            templateAreas={`"nav header" "nav main"`}
            gridTemplateRows={'10vh 1fr'}
            gridTemplateColumns={'20vh 1fr'}
            height={'100vh'}
        >
            <GridItem height={'100vh'} area={'header'}>
                <Navbar avatar justifyContent="flex-end" />
            </GridItem>
            <GridItem background={formBackGround} area={'nav'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'} paddingTop={26.9}>
                <Stack gap={20}>
                    <Flex alignSelf={'center'}>
                        <Image src='https://cdn-icons-png.flaticon.com/128/639/639365.png' alt='LOGO' width={12} />
                    </Flex>
                </Stack>
                <Center paddingBottom={20}>
                    <Stack align={'center'} gap={12}>
                        <Text fontSize={24}>ParcelAdmin</Text>
                        <Stack gap={3}>
                            <Button colorScheme='teal' size={'sm'} onClick={toggleColorMode} boxShadow='base' p='1' rounded='md'>
                                {colorMode === 'light' ? 'Dark' : 'Light'} Theme
                            </Button>
                            <Button colorScheme='teal' size={'sm'} onClick={userLogout} boxShadow='base' paddingLeft={8} paddingRight={8} rounded='md'>
                                Sair
                            </Button>
                        </Stack>
                    </Stack>
                </Center>
            </GridItem>
            <GridItem area={'main'} background={mainContainerColor}>
                {children}
            </GridItem>
        </Grid >
    )
}