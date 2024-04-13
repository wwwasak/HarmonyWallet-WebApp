import React from "react";
import { useParams } from "react-router-dom";
import RatesDetailCard from "./components/RatesDetailCard";

const RatesDetailPage = () => {
  const { baseCurrency, selectedCurrency } = useParams();
  return (
    <RatesDetailCard
      baseCurrency={baseCurrency}
      selectedCurrency={selectedCurrency}
    />
  );
};

export default RatesDetailPage;
