import React from "react";
import { Badge, HStack } from "@chakra-ui/react";

const RatesStatistics = ({ data, currency }) => {
  if (!data || !data.rates) {
    return null;
  }

  const calculateCurrencyStats = (ratesData, selectedCurrency) => {
    const rates = Object.values(ratesData).map(
      (rate) => rate[selectedCurrency]
    );
    const maxRate = Math.max(...rates);
    const minRate = Math.min(...rates);
    const averageRate =
      rates.reduce((acc, curr) => acc + curr, 0) / rates.length;

    return {
      maxRate,
      minRate,
      averageRate,
    };
  };

  const stats = calculateCurrencyStats(data.rates, currency);

  return (
    <HStack justifyContent="space-between" alignItems="center" margin={2}>
      <Badge fontSize="lg" colorScheme="red">
        LOWEST: {stats.minRate.toFixed(4)}
      </Badge>
      <Badge fontSize="lg" colorScheme="green">
        HIGHEST: {stats.maxRate.toFixed(4)}
      </Badge>
      <Badge fontSize="lg">AVERAGE: {stats.averageRate.toFixed(4)}</Badge>
    </HStack>
  );
};

export default RatesStatistics;
