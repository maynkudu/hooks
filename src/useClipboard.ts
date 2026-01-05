import { useCallback, useEffect, useRef, useState } from "react";

interface Clipboard {
    /**
     * True for a short time after a successful copy,
     * then automatically flips back to false.
     */
    readonly copied: boolean;

    /**
     * Copies the given text to the clipboard.
     * Safe to call repeatedly.
     */
    readonly copy: (text: string) => Promise<void>;

    /**
     * The last error that happened during copy,
     * or null when everything is working fine.
     */
    readonly error: Error | null;

    /**
     * Whether the Clipboard API is available
     * in this browser/environment.
     */
    readonly isSupported: boolean;
}

interface Options {
    /**
     * How long (in milliseconds) `copied` should stay true.
     * Defaults to 1500ms.
     */
    timeout?: number;
}

/**
 * useClipboard
 *
 * A small helper for copying text to the clipboard and showing
 * friendly UI state around it.
 *
 * What it does:
 * - copies text using the browser Clipboard API
 * - tells you when text was copied
 * - tells you when something failed
 * - automatically resets the copied state
 *
 * Example:
 *
 * const { copied, copy, error, isSupported } = useClipboard();
 *
 * return (
 *   <div>
 *     <button disabled={!isSupported} onClick={() => copy("Hello clipboard")}>
 *       Copy
 *     </button>
 *
 *     {copied && <span>Copied!</span>}
 *     {error && <span>{error.message}</span>}
 *   </div>
 * );
 */

const useClipboard = (options: Options = {}): Clipboard => {
    const { timeout = 1500 } = options;

    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Keep track of the reset timer so we can clear it if needed
    const timerRef = useRef<number | null>(null);

    // Check once whether the Clipboard API is available
    const isSupported =
        typeof navigator !== "undefined" &&
        !!navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function";

    /**
     * Tries to copy the given text and updates UI state around it.
     */
    const copy = useCallback(
        async (text: string) => {
            if (!isSupported) {
                setError(new Error("Clipboard API not supported"));
                setCopied(false);
                return;
            }

            try {
                await navigator.clipboard.writeText(text);

                setCopied(true);
                setError(null);

                // Reset copied after the configured timeout
                if (timerRef.current) window.clearTimeout(timerRef.current);

                timerRef.current = window.setTimeout(() => {
                    setCopied(false);
                }, timeout);
            } catch (err) {
                setCopied(false);
                setError(err instanceof Error ? err : new Error("Copy failed"));
            }
        },
        [isSupported, timeout]
    );

    // Clear timers when the component using this hook unmounts
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, []);

    return {
        copied,
        copy,
        error,
        isSupported,
    };
};

export default useClipboard;
