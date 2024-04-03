import { Flex, useColorModeValue } from "@chakra-ui/react"

export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const formBackGround = useColorModeValue("gray.100", "gray.700")

    return (
        <Flex bg={formBackGround} p={'24px'} alignItems={'center'} gap={'32px'} alignSelf={'stretch'} borderRadius={'8px'}>
            {children}
        </Flex>
    )
}