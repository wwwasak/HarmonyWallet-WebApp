import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

const useRates = (base, date) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get("http://localhost:3000/api/get-currency-rate", {
        params: {
          fromDate: date,
          currency: base,
        },
      })
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
  }, [base, date]);

  return { data, error, isLoading };
};

export default useRates;
