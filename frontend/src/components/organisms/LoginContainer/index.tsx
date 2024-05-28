"use client"
import { themes } from "@/themes/theme-tokens";
import { Button, Flex, Heading, Input, Link, useColorModeValue } from "@chakra-ui/react"

interface IProps {
  resetPassword?: boolean;
  email: string;
  password: string;
  newPassword?: string;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  onNewPassword?: (value: string) => void;
  onContinue: () => void
}

export const LoginContainer = ({ resetPassword=false, email, password, newPassword, onEmail, onPassword, onNewPassword, onContinue }: IProps) => {

  const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark)

  return (
    <Flex direction={"column"} background={formBackGround} p={24} rounded={24} margin={5}>
      <Heading mb={6}>{resetPassword ? "Redefinir Senha" : "Log in"}</Heading>
      <Input placeholder='E-mail' variant={"filled"} mb={3} type='email' onChange={(e) => onEmail(e.target.value)} value={email} />
      <Input placeholder={resetPassword ? 'Nova Senha' : 'Senha'} variant={"filled"} mb={resetPassword ? 3 : 6} type='password' onChange={(e) => onPassword(e.target.value)} value={password} />
      {resetPassword &&
        <Input placeholder='Nova Senha' variant={"filled"} mb={6} type='password' onChange={(e) => onNewPassword && onNewPassword(e.target.value)} value={newPassword} />
      }
      <Button onClick={onContinue} colorScheme='teal'>{resetPassword ? "Redefinir" : "Log in"}</Button>
      <Flex alignSelf={'center'} paddingTop={'4'} direction={'column'} align={'center'} gap={2}>
        {resetPassword ? (
          <Link href="/auth/login">Voltar</Link>
        ) :
        (
          <Flex alignSelf={'center'} paddingTop={'4'} direction={'column'} align={'center'} gap={2}>
            <Link href="/auth/reset-password">Esqueci minha senha</Link>
            <Link href="/auth/register">Cadastrar</Link>
          </Flex>
        )
        }
      </Flex>
    </Flex>
  )
}