import { useEffect, useState } from "react";

interface WindowInfo {
    width: number;
    height: number;
    orientation: "portrait" | "landscape";
    type: "mobile" | "tablet" | "desktop";
}

export function useWindow(): WindowInfo {
    const get = (): WindowInfo => {
        const width = typeof window !== "undefined" ? window.innerWidth : 0;
        const height = typeof window !== "undefined" ? window.innerHeight : 0;

        let type: WindowInfo["type"] = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

        return {
            width,
            height,
            orientation: height > width ? "portrait" : "landscape",
            type,
        };
    };

    const [info, setInfo] = useState<WindowInfo>(get);

    useEffect(() => {
        function onResize() {
            setInfo(get());
        }

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return info;
}
