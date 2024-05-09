import axios from "axios";
import { CURRENCY_TIMEZONES } from "../data/CURRENCY_TIMEZONES";
import { useState } from "react";
import { useEffect } from "react";

const useLocalTimes = (currency) => {
  const localTimeZone = CURRENCY_TIMEZONES[currency];

  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      axios
        .get(`https://worldtimeapi.org/api/timezone/${localTimeZone}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
    };
    fetchData();

    const interval = setInterval(fetchData, 60000); /** Time invermal TBD */

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [currency]);

  return { data, error, isLoading };
};

export default useLocalTimes;
