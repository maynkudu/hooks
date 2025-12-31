import { useEffect, useState } from "react";

export function useMatchMedia(query: string) {
    const get = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);

    const [matches, setMatches] = useState(get);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);

        const handler = () => setMatches(media.matches);

        media.addEventListener("change", handler);
        handler();

        return () => media.removeEventListener("change", handler);
    }, [query]);

    return matches;
}
