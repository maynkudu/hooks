import { useState, useCallback } from "react";

export function useUndo<T>(initial: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initial);
  const [future, setFuture] = useState<T[]>([]);

  const set = useCallback((next: T) => {
    setPast(prev => [...prev, present]);
    setPresent(next);
    setFuture([]);
  }, [present]);

  const undo = useCallback(() => {
    setPast(prev => {
      if (prev.length === 0) return prev;

      const newPast = [...prev];
      const previous = newPast.pop() as T;

      setFuture(f => [present, ...f]);
      setPresent(previous);

      return newPast;
    });
  }, [present]);

  const redo = useCallback(() => {
    setFuture(prev => {
      if (prev.length === 0) return prev;

      const [next, ...rest] = prev;

      setPast(p => [...p, present]);
      setPresent(next);

      return rest;
    });
  }, [present]);

  const reset = useCallback(() => {
    setPast([]);
    setFuture([]);
    setPresent(initial);
  }, [initial]);

  return {
    value: present,
    set,
    undo,
    redo,
    reset,
    canUndo: past.length > 0,
    canRedo: future.length > 0
  };
}
