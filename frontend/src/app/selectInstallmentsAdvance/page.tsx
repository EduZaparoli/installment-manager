"use client"
import { InstallmentList } from "@/components/organisms/InstallmentList"
import { CustomerSection } from "@/components/templates/CustomerSection"
import { ResponsiveLayout } from "@/components/templates/ResponsiveLayout"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

export interface InstallmentType {
    number: number,
    date: string,
    value: number,
    checkboxEnabled?: boolean
}

const SelectInstallmentsAdvancePage = () => {
    const [isDisabled, setIsDisabled] = useState(true)

    const user = {
        fullname: 'Eduardo Zaparoli',
        documentNumber: '021.909.730-58',
        email: 'edu@gmail.com',
        phoneNumber: '(54) 9 9661-4677'
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

    const [installmentsData, setInstallmentsData] = useState<InstallmentType[] | []>(installments)

    const handleCheckboxChange = (installments: Array<InstallmentType>) => {
        setInstallmentsData(installments)
        if (installments.find((installments) => installments.checkboxEnabled)) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

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
                    <InstallmentList installmentsData={installmentsData} checkbox totalValue onCheckboxChange={handleCheckboxChange} />
                    <Flex gap={'16px'} flexDirection={'row'} marginTop={'40px'}>
                        <Button>Voltar</Button>
                        <Button disabled={isDisabled}>Continuar</Button>
                    </Flex>
                </Box>
            </Flex>
        </ResponsiveLayout>
    )
}

export default SelectInstallmentsAdvancePage