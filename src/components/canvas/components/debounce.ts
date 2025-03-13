import { useEffect, useRef, useState } from "react";

const useDebouncedValue = <T extends string | number>(
  value: T,
  delay: number
): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
