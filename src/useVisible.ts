import { useEffect, useRef, useState } from "react";

export function useVisibility<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, visible] as const;
}
