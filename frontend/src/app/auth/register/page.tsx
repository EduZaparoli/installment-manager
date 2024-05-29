"use client"
import { Flex, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthStore } from '@/stores/AuthStore';
import { Container } from '@/components/atoms/Container';
import { RegisterContainer } from '@/components/organisms/RegisterContainer';
import { api } from '@/service/APIService';

const Register = () => {

    const { fetchAccessToken } = new AuthStore()
    const toast = useToast()

    const router = useRouter()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onContinue = async () => {
        try {
            const response = await api.postUser(firstName, lastName, email, password)
            if(response.statusCode === 400) {
                toast({
                    title: 'Erro',
                    description: "E-mail ou senha incorretos.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                })
            }
            await fetchAccessToken(email, password)
            router.push('/searchUser')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Container align='center' justifyContent='space-between' navbar theme logo>
                <Flex height={'90vh'} alignItems={'center'} justifyContent={'center'}>
                    <RegisterContainer onContinue={onContinue} firstName={firstName} lastName={lastName} email={email} password={password} onFirstName={setFirstName} onLastName={setLastName} onEmail={setEmail} onPassword={setPassword} />
                </Flex>
            </Container>
        </>
    );
}

export default Register;
