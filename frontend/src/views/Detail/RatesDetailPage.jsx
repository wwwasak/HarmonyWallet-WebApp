import React from "react";
import RatesDetailCard from "./components/RatesDetailCard";
import { useParams } from "react-router-dom";

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
