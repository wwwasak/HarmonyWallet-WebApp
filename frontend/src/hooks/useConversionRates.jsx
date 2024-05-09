import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

const useConversionRates = (amount, fromCurrency, toCurrency) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      setLoading(true);
      axios
        .get(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
    }

    return () => controller.abort();
  }, [amount, fromCurrency, toCurrency]);

  return { data, error, isLoading };
};

export default useConversionRates;
