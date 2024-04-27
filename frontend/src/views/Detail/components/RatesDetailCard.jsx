import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Heading } from "@chakra-ui/react";
import Charts from "./Charts";
import React from "react";

const RatesDetailCard = ({ baseCurrency, selectedCurrency }) => {
  return (
    <Card
      key={`${baseCurrency}vs${selectedCurrency}`}
      alignItems="center"
      background="gray.200"
      borderRadius={20}
      margin={3}
    >
      <Box
        background="gray.400"
        padding={3}
        width="100%"
        textAlign="center"
        margin={0}
        overflow="hidden"
        borderTopRadius={20}
      >
        <Heading size="md" color="white">
          1 {baseCurrency} <ArrowForwardIcon /> {selectedCurrency}
        </Heading>
      </Box>

      <CardBody alignItems="center" width="100%">
        <Charts
          baseCurrency={baseCurrency}
          selectedCurrency={selectedCurrency}
        />
      </CardBody>
    </Card>
  );
};

export default RatesDetailCard;
