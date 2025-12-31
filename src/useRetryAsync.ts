import { useEffect, useRef, useState } from "react";

interface Options {
    retries?: number;
    delay?: number;
}

export function useRetryAsync<T>(fn: () => Promise<T>, deps: any[] = [], { retries = 3, delay = 1000 }: Options = {}) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const attempts = useRef(0);

    useEffect(() => {
        let cancelled = false;
        attempts.current = 0;

        async function run() {
            setLoading(true);

            while (attempts.current < retries && !cancelled) {
                try {
                    const result = await fn();
                    if (!cancelled) {
                        setData(result);
                        setError(null);
                        setLoading(false);
                    }
                    return;
                } catch (err) {
                    attempts.current += 1;
                    if (attempts.current >= retries) {
                        if (!cancelled) {
                            setError(err);
                            setLoading(false);
                        }
                        return;
                    }
                    await new Promise(r => setTimeout(r, delay));
                }
            }
        }

        run();

        return () => {
            cancelled = true;
        };
    }, deps);

    return { data, error, loading };
}
