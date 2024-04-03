"use client"
import { Box, Button, Container, Flex, Stack, Text } from "@chakra-ui/react"
import { WarningIcon } from '@chakra-ui/icons'
import { useRouter } from "next/navigation"

const NotFound = () => {

    const router = useRouter()

    const onBack = () => {
        router.push('/dashboard')
    }

    return (
        <Container height={'100vh'} alignItems="center" justifyContent="center">
            <Flex alignItems={'center'} justifyContent={'center'} padding={12} paddingTop={32} paddingBottom={24}>
                <Stack alignItems={'center'} justifyContent={'center'}>
                    <Box>
                        <WarningIcon color={'teal'} boxSize={'6em'} />
                    </Box>
                    <Text fontSize={64}>404</Text>
                    <Text fontSize={24}>PAGE NOT FOUND</Text>
                    <Text fontSize={24} textAlign={'center'}>The page you are looking for might have been removed had its name changed or is temporarily unavailable</Text>
                </Stack>
            </Flex>
            <Box alignItems={'center'} justifyContent={'center'} display={'flex'} padding={10}>
                <Button onClick={onBack} colorScheme="teal">GO TO HOMEPAGE</Button>
            </Box>
        </Container >
    )
}

export default NotFound;