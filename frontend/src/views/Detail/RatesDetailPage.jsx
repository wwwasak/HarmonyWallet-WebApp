import { Grid, GridItem } from "@chakra-ui/react";
import NewsGrid from "./components/NewsGrid";
import React from "react";
import RatesDetailCard from "./components/RatesDetailCard";
import { useParams } from "react-router-dom";

const RatesDetailPage = () => {
  const { baseCurrency, selectedCurrency } = useParams();
  return (
    <Grid
      templateAreas={{
        base: `"main" "aside"`,
        lg: `" main main aside"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr 1fr",
      }}
    >
      <GridItem area="main">
        <RatesDetailCard
          baseCurrency={baseCurrency}
          selectedCurrency={selectedCurrency}
        />
      </GridItem>

      <GridItem area="aside">
        <NewsGrid
          baseCurrency={baseCurrency}
          selectedCurrency={selectedCurrency}
        />
      </GridItem>
    </Grid>
  );
};

export default RatesDetailPage;
