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
      .get(`https://api.frankfurter.app/${date}..?from=${base}`)
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

  //   const fetchDataForDate = async (date) => {
  //     try {
  //       const res = await axios.get(
  //         `https://api.frankfurter.app/${date}..?from=${base}`
  //       );
  //       return res.data;
  //     } catch (err) {
  //       throw err;
  //     }
  //   };

  //   const fetch7DaysData = async () => {
  //     setLoading(true);

  //     const newData = [];
  //     try {
  //       const startDate = new Date("2024-04-19");
  //       const endDate = new Date("2024-04-25");
  //       let currentDate = new Date(startDate);

  //       while (currentDate <= endDate) {
  //         const formattedDate = currentDate.toISOString().split("T")[0];
  //         const fetchedData = await fetchDataForDate(formattedDate);
  //         newData.push({ date: formattedDate, data: fetchedData });
  //         currentDate.setDate(currentDate.getDate() + 1);
  //       }
  //       setData(newData);
  //       setLoading(false);
  //     } catch (err) {
  //       if (axios.isCancel(err)) return;
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   const controller = new AbortController();
  //   fetch7DaysData();

  //   return () => controller.abort();
  // }, [base]);

  // return { data, error, isLoading }
};

export default useRates;
