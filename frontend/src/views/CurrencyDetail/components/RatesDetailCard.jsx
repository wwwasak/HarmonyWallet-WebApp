import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import Charts from "./Charts";
import React from "react";

const RatesDetailCard = ({ baseCurrency, selectedCurrency }) => {
  return (
    <Card
      key={`${baseCurrency}vs${selectedCurrency}`}
      alignItems="center"
      borderRadius={20}
      margin={3}
    >
      <Heading size="md" marginY={3}>
        1 {baseCurrency} <ArrowForwardIcon /> {selectedCurrency}
      </Heading>

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
