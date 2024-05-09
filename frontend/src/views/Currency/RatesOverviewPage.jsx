import { Grid, GridItem, HStack, Box, Text } from "@chakra-ui/react";
import BaseCurrencySelector from "./components/BaseCurrencySelector";
import Calculator from "./components/Calculator";
import CurrencyGrid from "./components/CurrencyGrid";
import React from "react";

const RatesOverviewPage = () => {
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
        pt={10}
        pb={10}
        pl={20}
        pr={20}
      >
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
              <Calculator />
              <HStack>
                <Text
                  as="i"
                  fontWeight="700"
                  fontSize="xl"
                  color="grey"
                  marginRight={2}
                >
                  1
                </Text>
                <BaseCurrencySelector />
                <Text
                  as="i"
                  fontWeight="700"
                  fontSize="xl"
                  color="grey"
                  marginRight={2}
                >
                  =
                </Text>
              </HStack>
            </HStack>
          </GridItem>

          <GridItem area="main" marginX={30}>
            <CurrencyGrid />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default RatesOverviewPage;
//
