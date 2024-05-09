import { CURRENCIES } from "../../../data/CURRENCIES.js";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { useCurrency } from "../../../stores/BaseCurrencyContext";
import CurrencyCard from "./CurrencyCard";
import CurrencyCardContainer from "./CurrencyCardContainer";
import CurrencyCardSkeleton from "./CurrencyCardSkeleton";
import React from "react";
import useLatestRates from "../../../hooks/useLatestRates";

const CurrencyGrid = () => {
  const { baseCurrency } = useCurrency();
  const { data, isLoading, error } = useLatestRates(baseCurrency);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const favoriteCurrencies = [];
  const unFavoriteCurrencies = [];

  CURRENCIES.forEach((currency) => {
    const isFavorite = localStorage.getItem(currency) === "true";
    if (isFavorite) {
      favoriteCurrencies.push(currency);
    } else {
      unFavoriteCurrencies.push(currency);
    }
  });

  const sortedCurrencies = [...favoriteCurrencies, ...unFavoriteCurrencies];

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={10}
      padding="5px"
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <CurrencyCardContainer key={skeleton}>
            <CurrencyCardSkeleton />
          </CurrencyCardContainer>
        ))}
      {sortedCurrencies.map(
        (currency, index) =>
          data.rates &&
          data.rates[currency] && (
            <CurrencyCardContainer key={index}>
              <CurrencyCard currency={currency} rate={data.rates[currency]} />
            </CurrencyCardContainer>
          )
      )}
    </SimpleGrid>
  );
};

export default CurrencyGrid;
