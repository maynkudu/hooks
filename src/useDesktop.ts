import { useWindow } from "./useWindow";

export function useDesktop() {
    const { type } = useWindow();
    return type === "desktop";
}
