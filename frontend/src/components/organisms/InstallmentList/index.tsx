import { InstallmentType } from "@/app/selectInstallmentsAdvance/page"
import { Installment } from "@/components/molecules/Installment"
import { Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"

interface IProps {
    installmentsData: Array<InstallmentType>,
    checkbox?: boolean,
    totalValue?: boolean,
    onCheckboxChange?: (installment: Array<InstallmentType>) => void
}

export const InstallmentList: React.FC<IProps> = ({ installmentsData, checkbox, onCheckboxChange, totalValue }) => {
    const [total, setTotal] = useState(0)

    const handleCheckbox = (isChecked: boolean, index: number) => {
        let totalInstallmentsValue = 0
        installmentsData.forEach((installment, indexInstallmentData) => {
            if ((isChecked && indexInstallmentData <= index) || (!isChecked && indexInstallmentData < index)) {
                totalInstallmentsValue += installment.value
                installment.checkboxEnabled = true
                installmentsData[indexInstallmentData] = installment
            } else if (!isChecked) {
                installment.checkboxEnabled = false
                installmentsData[indexInstallmentData] = installment
            }
        })
        setTotal(totalInstallmentsValue)
        if (onCheckboxChange) {
            onCheckboxChange(installmentsData)
        }
    }

    const formBackGround = useColorModeValue("gray.100", "gray.700")

    return (
        <>
            {installmentsData.map((installment, index) => (
                <Installment key={index} number={installment.number} date={installment.date} value={installment.value} onCheckboxChange={(isChecked) => handleCheckbox(isChecked, index)} checkboxEnabled={installment.checkboxEnabled} checkbox={checkbox} />
            ))}
            {totalValue && (
                <Flex bg={formBackGround} p={'24px'} justifyContent={'space-between'} marginTop={'40px'} borderRadius={'8px'}>
                    <Text fontWeight={'medium'}>Total</Text>
                    <Text fontWeight={'medium'}>{total}</Text>
                </Flex>
            )}
        </>
    )
}