import { useRef, useState, useEffect } from "react";

export function useHover<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    node.addEventListener("mouseenter", enter);
    node.addEventListener("mouseleave", leave);

    return () => {
      node.removeEventListener("mouseenter", enter);
      node.removeEventListener("mouseleave", leave);
    };
  }, []);

  return [ref, hovering] as const;
}
