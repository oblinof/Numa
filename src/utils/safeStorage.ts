// Safe Storage helper that never throws in sandboxed or private browsing iframes

export function getSafeStorage(key: string, defaultValue: string): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      return val !== null ? val : defaultValue;
    }
  } catch {
    // Sandboxed iframe or cookies disabled
  }
  return defaultValue;
}

export function setSafeStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Sandboxed iframe or quota exceeded
  }
}
