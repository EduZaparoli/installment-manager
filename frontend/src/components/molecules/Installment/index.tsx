import { formatCurrencyBRL } from "@/utils/formatCurrencyBRL"
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface IProps {
    number: number,
    date: string,
    value: number,
    checkboxEnabled?: boolean,
    checkbox?: boolean,
    onCheckboxChange?: (isChecked: boolean, value: number) => void
}

export const Installment: React.FC<IProps> = ({ date, number, value, checkbox, checkboxEnabled, onCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(checkboxEnabled)

    useEffect(() => {
        setIsChecked(checkboxEnabled)
    }, [checkboxEnabled])

    const handleCheckboxChange = () => {
        const newValue = !isChecked
        setIsChecked(newValue)
        if (onCheckboxChange) {
            onCheckboxChange(newValue, value)
        }
    }

    return (
        <Flex justifyContent={'space-between'} flexDir={'row'} borderBottom={'1px'} paddingBottom={'8px'} marginBottom={'8px'}>
            <Flex flexDir={'column'}>
                <Flex alignSelf={'center'}>
                    {checkbox && (
                        <Checkbox colorScheme={'teal'} isChecked={isChecked} onChange={handleCheckboxChange} />
                    )}
                    <Box paddingLeft={checkbox ? '15px' : '0px'}>
                        <Text fontWeight={'medium'}>
                            {number}
                        </Text>
                        <Text fontWeight={'medium'}>
                            {date}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Text fontWeight={'medium'} alignSelf={'end'}>{formatCurrencyBRL(value)}</Text>
        </Flex>
    )
}