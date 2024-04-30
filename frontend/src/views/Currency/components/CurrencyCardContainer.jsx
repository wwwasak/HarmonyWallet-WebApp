import { Box } from "@chakra-ui/react";

const CurrencyCardContainer = ({ children }) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      borderRadius={10}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default CurrencyCardContainer;
