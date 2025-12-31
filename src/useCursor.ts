import { useEffect, useState } from "react";

interface Cursor {
    x: number;
    y: number;
}

export function useCursor() {
    const [pos, setPos] = useState<Cursor>({ x: 0, y: 0 });

    useEffect(() => {
        function move(e: MouseEvent) {
            setPos({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return pos;
}
