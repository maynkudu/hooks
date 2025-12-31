import { useEffect, useState } from "react";

export function usePreferredLanguage() {
    const get = () => (typeof navigator !== "undefined" ? navigator.language || "en" : "en");

    const [lang, setLang] = useState(get);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handler = () => setLang(get());

        window.addEventListener("languagechange", handler);

        return () => window.removeEventListener("languagechange", handler);
    }, []);

    return lang;
}
