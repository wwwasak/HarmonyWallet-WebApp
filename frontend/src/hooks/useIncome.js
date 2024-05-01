import { useState, useEffect } from "react";
import axios, { CanceledError } from "axios";

const useIncome = (currency, datePeriod) => {
  const [data, setData] = useState([]);
  // const [error, setError] = useState("");
  // const [isLoading, setLoading] = useState(false);

   useEffect(() => {
     const controller = new AbortController();

  //   setLoading(true);
  //   axios
  //     .get(`https://api.frankfurter.app/latest?from=${base}`)
  //     .then((res) => {
  //       setData(res.data);
  //       setLoading(false);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setLoading(false);
  //     });
    return () => controller.abort();
  }, [currency, datePeriod]);

  return { data };
};

export default useIncome;