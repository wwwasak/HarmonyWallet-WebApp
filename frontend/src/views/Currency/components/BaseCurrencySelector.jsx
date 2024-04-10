import { useCurrency } from "../../../stores/BaseCurrencyContext";
import CurrencySelector from "./CurrencySelector";

const BaseCurrencySelector = () => {
  const { baseCurrency, setBaseCurrency } = useCurrency();

  return (
    <CurrencySelector
      baseCurrency={baseCurrency}
      setBaseCurrency={setBaseCurrency}
    />
  );
};

export default BaseCurrencySelector;
