import { useWindow } from "./useWindow";

export function useTablet() {
    const { type } = useWindow();
    return type === "tablet";
}
