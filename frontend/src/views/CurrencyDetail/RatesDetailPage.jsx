import { Grid, GridItem, Link, Button, Box } from "@chakra-ui/react";
import NewsGrid from "./components/NewsGrid";
import React from "react";
import RatesDetailCard from "./components/RatesDetailCard";
import { useParams } from "react-router-dom";

const RatesDetailPage = () => {
  const { baseCurrency, selectedCurrency } = useParams();
  return (
    <Box
      bgGradient="linear(to-b, green.100, yellow.200)"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      borderRadius={20}
    >
      <Box
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(5px)"
        borderRadius={20}
      >
        <Link href="/exchangeoverview">
          <Button ml={20} mt={5}>
            Back
          </Button>
        </Link>
        <Grid
          templateAreas={`"main" "aside"`}
          templateColumns={"1fr"}
          pl={20}
          pr={20}
          m={5}
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
      </Box>
    </Box>
  );
};

export default RatesDetailPage;
