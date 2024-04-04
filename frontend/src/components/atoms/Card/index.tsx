import { themes } from "@/themes/theme-tokens"
import { Flex, useColorModeValue } from "@chakra-ui/react"

export const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const formBackGround = useColorModeValue(themes.colors.primary.primaryLight, themes.colors.primary.primaryDark)

    return (
        <Flex bg={formBackGround} p={'24px'} alignItems={'center'} gap={'32px'} alignSelf={'stretch'} borderRadius={'8px'}>
            {children}
        </Flex>
    )
}