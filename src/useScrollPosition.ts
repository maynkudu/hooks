import { useEffect, useState } from "react";

interface ScrollPos {
  x: number;
  y: number;
}

export function useScrollPosition() {
  const [pos, setPos] = useState<ScrollPos>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = () => {
      setPos({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return pos;
}
