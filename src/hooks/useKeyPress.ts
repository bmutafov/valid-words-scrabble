import { useCallback, useEffect } from 'react';

export function useKeyPress(targetKey: string, handler: () => void) {
  const downHandler = useCallback(
    ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        handler();
      }
    },
    [handler, targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler, handler]);
}
