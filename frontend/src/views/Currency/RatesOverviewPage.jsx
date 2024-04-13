import { Grid, GridItem, HStack } from "@chakra-ui/react";
import BaseCurrencySelector from "./components/BaseCurrencySelector";
import Calculator from "./components/Calculator";
import CurrencyGrid from "./components/CurrencyGrid";
import React from "react";

const RatesOverviewPage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"upper" "main"`,
        lg: `" upper" "main"`,
      }}
      templateRows={"100px 1fr"}
      templateColumns={"1fr"}
    >
      <GridItem area="upper" marginX={10}>
        <HStack justifyContent="space-between" alignItems="center">
          <BaseCurrencySelector />
          <Calculator />
        </HStack>
      </GridItem>

      <GridItem area="main" marginX={30}>
        <CurrencyGrid />
      </GridItem>
    </Grid>
  );
};

export default RatesOverviewPage;
//
