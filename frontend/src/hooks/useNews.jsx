import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

const useNews = (baseCurrency, selectedCurrency) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get(
        `https://forexnewsapi.com/api/v1?currencypair=${baseCurrency}-${selectedCurrency},${selectedCurrency}-${baseCurrency},${selectedCurrency}-USD,USD-${selectedCurrency}&items=5&page=1&token=dmo77gpbxukjmjpcg8xnvwlglqeo9d28svxpxti7`
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
    return () => controller.abort();
  }, [baseCurrency, selectedCurrency]);

  return { data, error, isLoading };
};

export default useNews;
