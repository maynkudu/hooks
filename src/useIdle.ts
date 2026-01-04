import { useEffect, useState } from "react";

export function useIdle(timeout = 30000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: any;

    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), timeout);
    };

    reset();

    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("scroll", reset);
    window.addEventListener("click", reset);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("click", reset);
    };
  }, [timeout]);

  return idle;
}
