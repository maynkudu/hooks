import { useEffect, useState } from "react";

export function useKeyPress(target: string) {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        function down(e: KeyboardEvent) {
            if (e.key === target) setPressed(true);
        }

        function up(e: KeyboardEvent) {
            if (e.key === target) setPressed(false);
        }

        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);

        return () => {
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, [target]);

    return pressed;
}
