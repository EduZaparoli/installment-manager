import { Card } from "@/components/atoms/Card";
import { Dropdown } from "@/components/atoms/Dropdown";
import { formatDocumentNumber } from "@/utils/formatDocumentNumber";
import { formatCellphoneNumber } from "@/utils/formatPhoneNumber";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface CustomerCardProps {
  fullname: string;
  documentNumber: string;
  email: string;
  phoneNumber: string;
  dropdown?: boolean;
}

export const CustomerCard = ({
  documentNumber,
  email,
  fullname,
  phoneNumber,
  dropdown = false,
}: CustomerCardProps) => {
  return (
    <Card>
      <Flex
        alignItems={"center"}
        gap={"32px"}
        alignSelf={"stretch"}
        width={"100%"}
      >
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={"24px"}
          flex={"1 0 0"}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            gap={"16px"}
          >
            <Text fontSize={"24px"}>{fullname}</Text>
          </Flex>
          <Flex flexDirection={"row"} gap={"54px"}>
            <Box>
              <Text fontWeight={"medium"}>CPF:</Text>
              <Text>{formatDocumentNumber(documentNumber)}</Text>
            </Box>
            <Box>
              <Text fontWeight={"medium"}>E-mail:</Text>
              <Text>{email}</Text>
            </Box>
            <Box>
              <Text fontWeight={"medium"}>Telefone:</Text>
              <Text>{formatCellphoneNumber(phoneNumber)}</Text>
            </Box>
          </Flex>
        </Flex>
        {dropdown && (
          <Flex>
            <Dropdown />
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
