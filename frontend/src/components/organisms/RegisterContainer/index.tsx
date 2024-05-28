"use client"
import { themes } from "@/themes/theme-tokens";
import { Box, Button, Flex, Heading, Input, Link, useColorModeValue } from "@chakra-ui/react"

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onFirstName: (value: string) => void;
  onLastName: (value: string) => void;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  onContinue: () => void
}

export const RegisterContainer = ({ firstName, lastName, email, password, onFirstName, onLastName, onEmail, onPassword, onContinue }: IProps) => {

  const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark)

  return (
    <Flex direction={"column"} background={formBackGround} p={24} rounded={24} margin={5}>
      <Heading mb={6}>Cadastrar</Heading>
      <Input placeholder='Nome' variant={"filled"} mb={3} type='text' onChange={(e) => onFirstName(e.target.value)} value={firstName} />
      <Input placeholder='Sobrenome' variant={"filled"} mb={3} type='text' onChange={(e) => onLastName(e.target.value)} value={lastName} />
      <Input placeholder='E-mail' variant={"filled"} mb={3} type='email' onChange={(e) => onEmail(e.target.value)} value={email} />
      <Input placeholder='Senha' variant={"filled"} mb={6} type='password' onChange={(e) => onPassword(e.target.value)} value={password} />
      <Button onClick={onContinue} colorScheme='teal'>Cadastrar</Button>
      <Box alignSelf={'center'} paddingTop={'4'}>
        <Link href="/auth/login">Voltar</Link>
      </Box>
    </Flex>
  )
}