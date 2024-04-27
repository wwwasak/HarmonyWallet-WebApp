import { CURRENCIES } from "../../../data/CURRENCIES.js";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CurrencyCard from "./CurrencyCard";
import CurrencyCardContainer from "./CurrencyCardContainer";
import CurrencyCardSkeleton from "./CurrencyCardSkeleton";
import React from "react";
import { useCurrency } from "../../../stores/BaseCurrencyContext";
import useLatestRates from "../../../hooks/useLatestRates";
import useWeeklyRates from "../../../hooks/useWeeklyRates.jsx";

const CurrencyGrid = () => {
  const { baseCurrency } = useCurrency();
  const { data, isLoading, error } = useLatestRates(baseCurrency);
  const { data: weeklyData } = useWeeklyRates(baseCurrency);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const favoriteCurrencies = [];
  const unfavoriteCurrencies = [];

  CURRENCIES.forEach((currency) => {
    if (data.rates && data.rates[currency]) {
      if (localStorage.getItem(currency) === "true") {
        favoriteCurrencies.push(currency);
      } else {
        unfavoriteCurrencies.push(currency);
      }
    }
  });

  const sortedCurrencies = [...favoriteCurrencies, ...unfavoriteCurrencies];

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
      {sortedCurrencies.map((currency, index) => (
        <CurrencyCardContainer key={index}>
          {data.rates && data.rates[currency] && (
            <CurrencyCard
              currency={currency}
              rate={data.rates[currency]}
              rates={weeklyData}
            />
          )}
        </CurrencyCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default CurrencyGrid;
