import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type UseLocalStorageReturn<T> = [
    T,
    Dispatch<SetStateAction<T>>,
    {
        remove: () => void;
        reset: () => void;
    }
];

export function useLocalStorage<T>(key: string, initial: T): UseLocalStorageReturn<T> {
    const isMounted = typeof window !== "undefined";
    const initialRef = useRef(initial);

    const read = (): T => {
        if (!isMounted) return initialRef.current;

        try {
            const item = window.localStorage.getItem(key);
            if (item === null) return initialRef.current;
            return JSON.parse(item) as T;
        } catch {
            // corrupted data or invalid JSON — fall back safely
            return initialRef.current;
        }
    };

    const [value, setValue] = useState<T>(() => read());

    // write to localStorage when value changes
    useEffect(() => {
        if (!isMounted) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // quota exceeded, private mode, or blocked storage
        }
    }, [key, value, isMounted]);

    // sync across tabs / windows
    useEffect(() => {
        if (!isMounted) return;

        function handle(e: StorageEvent) {
            if (e.key !== key) return;
            setValue(read());
        }

        window.addEventListener("storage", handle);
        return () => window.removeEventListener("storage", handle);
    }, [key, isMounted]);

    // helpers
    const remove = () => {
        if (!isMounted) return;
        window.localStorage.removeItem(key);
        setValue(initialRef.current);
    };

    const reset = () => {
        setValue(initialRef.current);
    };

    return [value, setValue, { remove, reset }];
}
