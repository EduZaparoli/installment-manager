import { Box } from "@chakra-ui/react"
import { Navbar } from "../../organisms/Navbar";

interface IProps {
  children: React.ReactNode;
  align?: string;
  justifyContent?: string;
  navbar?: boolean;
  avatar?: React.ReactNode;
  theme?: React.ReactNode;
  logo?: boolean;
}

export const Container = ({ children, align, justifyContent, navbar = false, avatar = false, theme = false, logo = false }: IProps) => {

  return (
    <>
      {navbar && <Navbar logo={logo} avatar={avatar} theme={theme} justifyContent={justifyContent} />}
      <Box height={"92vh"} alignItems={align}>
        {children}
      </Box>
    </>
  )
}