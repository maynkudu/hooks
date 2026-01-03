import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, ms: number, active = true) {
  const saved = useRef(callback);

  saved.current = callback;
  useEffect(() => {
    if (!active) return;

    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [ms, active]);
}
