import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
