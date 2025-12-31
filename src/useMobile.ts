import { useWindow } from "./useWindow";

export function useMobile() {
    const { type } = useWindow();
    return type === "mobile";
}
