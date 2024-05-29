import { Box, Select } from "@chakra-ui/react";

export const Dropdown = () => {
  return (
    <Box>
      <Select variant={"outline"} placeholder="Selecione um produto">
        <option value="option1">CAMISETA + CALÇA</option>
        <option value="option2">JAQUETA</option>
        <option value="option3">SAPATO</option>
      </Select>
    </Box>
  );
};
