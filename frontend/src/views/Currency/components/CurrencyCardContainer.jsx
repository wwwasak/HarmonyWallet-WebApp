import { Box } from "@chakra-ui/react";

const CurrencyCardContainer = ({ children }) => {
  return (
    <Box borderRadius={10} overflow="hidden" position="relative">
      {children}
    </Box>
  );
};

export default CurrencyCardContainer;
