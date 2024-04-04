"use client"
import { ModalSearchUser } from "@/components/molecules/ModalSearchUser"
import { InstallmentList } from "@/components/organisms/InstallmentList"
import { CustomerSection } from "@/components/templates/CustomerSection"
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const InstallmentsResume = () => {

    const user = {
        fullname: 'Eduardo Zaparoli',
        documentNumber: '01298442168',
        email: 'edu@gmail.com',
        phoneNumber: '54995413123'
    }

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const onBack = () => {
        router.push('/selectInstallmentsAdvance')
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
            value: 200
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
                    <Text paddingBottom={'20px'} fontSize={'24px'}>Resumo das parcelas</Text>
                    <InstallmentList installmentsData={installments} totalValue />
                    <Flex gap={'16px'} flexDirection={'row'} marginTop={'40px'}>
                        <Button colorScheme={'teal'} onClick={onBack}>Voltar</Button>
                        <Button colorScheme={'teal'} onClick={handleOpenModal}>Confirmar</Button>
                    </Flex>
                </Box>
            </Flex>
            <ModalSearchUser modalTitle="Enviar boleto de pagamento" isOpen={isOpen} isClose={handleCloseModal} />
        </ResponsiveLayout>
    )
}

export default InstallmentsResume