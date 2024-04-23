import { API_KEY } from "../data/API_KEY";
import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

const useLatestRates = (base) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`)
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
  }, [base]);

  return { data, error, isLoading };
};

export default useLatestRates;
