import React from "react";
import BaseCurrencySelector from "./components/BaseCurrencySelector";
import Calculator from "./components/Calculator";

const RatesOverviewPage = () => {
  return (
    <>
      <BaseCurrencySelector />
      <Calculator />
    </>
  );
};

export default RatesOverviewPage;
