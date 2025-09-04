import { useEffect, useState } from "react";

export default function useDebounce(initializeValue, delay) {
  const [debounceValue, setDebounceValue] = useState(initializeValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [initializeValue, delay]);
  return debounceValue;
}
