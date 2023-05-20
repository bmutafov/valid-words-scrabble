import { useEffect } from 'react';

export function useAutoFocus(element?: HTMLInputElement | null) {
  useEffect(() => {
    if (!element) return;

    element.focus();
  }, [element]);
}
