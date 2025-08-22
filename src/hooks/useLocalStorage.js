import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.warn("useLocalStorage read error for key", key, e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("useLocalStorage write error for key", key, e);
    }
  }, [key, value]);

  return [value, setValue];
}
