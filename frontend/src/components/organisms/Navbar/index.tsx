import { Avatar, Box, Button, Flex, Image, WrapItem, useColorMode, useColorModeValue } from "@chakra-ui/react"

interface IProps {
  avatar?: React.ReactNode;
  theme?: React.ReactNode;
  logo?: React.ReactNode;
  justifyContent?: string;
}

export const Navbar = ({ avatar, theme, logo, justifyContent = 'space-between' }: IProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const formBackGround = useColorModeValue("gray.200", "gray.700")

  return (
    <Flex height={'10vh'} alignItems={"center"} justifyContent={justifyContent} paddingLeft={16} paddingRight={16} background={formBackGround}>
      {logo &&
        <Box width={12} marginLeft={2}>
          <Image src='https://cdn-icons-png.flaticon.com/128/639/639365.png' alt='LOGO' />
        </Box>
      }
      <WrapItem alignItems={'center'}>
        {theme &&
          <Box>
            <Button size={'sm'} onClick={toggleColorMode} boxShadow='base' p='1' rounded='md'>
              {colorMode === 'light' ? 'Dark' : 'Light'} Theme
            </Button>
          </Box>
        }
        {avatar &&
          <Box paddingLeft={5} marginRight={2}>
            <Avatar name="Eduardo Zaparoli" src="https://i.pinimg.com/736x/f1/4f/00/f14f00c1f7e155220268ed7eb1f9487f.jpg" background={"gray.300"} />
          </Box>
        }
      </WrapItem>
    </Flex>
  )
}