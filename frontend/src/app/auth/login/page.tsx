"use client"
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthStore } from '@/stores/AuthStore';
import { Container } from '@/components/atoms/Container';
import { LoginContainer } from '@/components/organisms/LoginContainer';

const Home = () => {

    const { fetchAccessToken } = new AuthStore()

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onContinue = async () => {
        try {
            await fetchAccessToken(email, password)
            router.push('/searchUser')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Container align='center' justifyContent='space-between' navbar theme logo>
                <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
                    <LoginContainer onContinue={onContinue} email={email} password={password} onEmail={setEmail} onPassword={setPassword} />
                </Flex>
            </Container>
        </>
    );
}

export default Home;
