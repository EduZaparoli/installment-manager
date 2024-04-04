import { Button, Center, Flex, Grid, GridItem, Image, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AuthStore } from "../../../stores/AuthStore";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/organisms/Navbar";

interface IProps {
    children: React.ReactNode;
}

/*
rgb(86, 28, 36)
rgb(109, 41, 50)
rgb(199, 183, 163)
rgb(232, 216, 196)
*/

export const ResponsiveLayout = ({ children }: IProps) => {
    const { isAuthenticated, logout } = new AuthStore();
    const router = useRouter();
    const formBackGround = useColorModeValue("gray.100", "gray.600")
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
                            <Button size={'sm'} onClick={toggleColorMode} boxShadow='base' p='1' rounded='md'>
                                {colorMode === 'light' ? 'Dark' : 'Light'} Theme
                            </Button>
                            <Button size={'sm'} onClick={userLogout} boxShadow='base' paddingLeft={8} paddingRight={8} rounded='md'>
                                Sair
                            </Button>
                        </Stack>
                    </Stack>
                </Center>
            </GridItem>
            <GridItem area={'main'}>
                {children}
            </GridItem>
        </Grid >
    )
}