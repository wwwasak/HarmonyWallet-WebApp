import { CURRENCIES } from "../../../data/CURRENCIES.js";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CurrencyCard from "./CurrencyCard";
import CurrencyCardContainer from "./CurrencyCardContainer";
import CurrencyCardSkeleton from "./CurrencyCardSkeleton";
import React from "react";
import { useCurrency } from "../../../stores/BaseCurrencyContext";
import useLatestRates from "../../../hooks/useLatestRates";
import useRates from "../../../hooks/useRates.jsx";
import { subDays, format } from "date-fns";

const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

const CurrencyGrid = () => {
  const { baseCurrency } = useCurrency();
  const { data, isLoading, error } = useLatestRates(baseCurrency);
  const { data: weeklyData, isLoading: weeklyDataLoading } = useRates(
    baseCurrency,
    oneWeekAgo
  );

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
      {!weeklyDataLoading &&
        sortedCurrencies.map(
          (currency, index) =>
            data.rates &&
            data.rates[currency] && (
              <CurrencyCardContainer key={index}>
                <CurrencyCard
                  currency={currency}
                  rate={data.rates[currency]}
                  rates={weeklyData}
                />
              </CurrencyCardContainer>
            )
        )}
    </SimpleGrid>
  );
};

export default CurrencyGrid;
