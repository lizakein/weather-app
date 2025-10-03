import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initValue: T) {
  const [ value, setValue ] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initValue; 
    } catch (err) {
      console.error("Read localStorage error:", err);
      return initValue;
    } 
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Write localStorage error", err);
    }
  }, [key, value]);

  return [ value, setValue ] as const;
}