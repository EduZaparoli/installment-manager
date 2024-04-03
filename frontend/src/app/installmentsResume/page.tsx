"use client"
import { InstallmentList } from "@/components/organisms/InstallmentList"
import { CustomerSection } from "@/components/templates/CustomerSection"
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout"
import { Box, Button, Flex, Text } from "@chakra-ui/react"

const InstallmentsResume = () => {

    const user = {
        fullname: 'Eduardo Zaparoli',
        documentNumber: '012.984.421-68',
        email: 'edu@gmail.com',
        phoneNumber: '(54) 9 9541-3123'
    }

    const installments = [
        {
            number: 2,
            date: 'dd/mm/aaaa',
            value: 100
        },
        {
            number: 3,
            date: 'dd/mm/aaaa',
            value: 100
        },
    ]

    return (
        <ResponsiveLayout>
            <CustomerSection customer={{
                fullname: user.fullname,
                documentNumber: user.documentNumber,
                email: user.email,
                phoneNumber: user.phoneNumber
            }} />
            <Flex flexDirection={'column'} w={'100%'} align={'center'} alignSelf={'center'} margin={'40px 0 104px 0'}>
                <Box width={'40%'}>
                    <Text paddingBottom={'20px'} fontSize={'24px'}>Selecione as parcelas</Text>
                    <InstallmentList installmentsData={installments} totalValue />
                    <Flex gap={'16px'} flexDirection={'row'} marginTop={'40px'}>
                        <Button>Voltar</Button>
                        <Button>Confirmar</Button>
                    </Flex>
                </Box>
            </Flex>
        </ResponsiveLayout>
    )
}

export default InstallmentsResume