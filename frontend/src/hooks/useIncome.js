import { useState, useEffect } from "react";
import axios from "axios";

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 */
export default function useIncome(url, initialState = null) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, isLoading };
}