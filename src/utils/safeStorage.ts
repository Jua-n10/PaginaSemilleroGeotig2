/**
 * safeStorage — wrapper seguro para sessionStorage y localStorage.
 *
 * iOS Safari en modo privado y algunos Android con cookies bloqueadas
 * lanzan SecurityError al acceder a sessionStorage/localStorage.
 * Este helper envuelve cada operación en try-catch para evitar crashes.
 */

function getStorage(type: "session" | "local"): Storage | null {
  try {
    return type === "session" ? sessionStorage : localStorage;
  } catch {
    return null;
  }
}

export const safeSession = {
  getItem(key: string): string | null {
    try {
      return getStorage("session")?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      getStorage("session")?.setItem(key, value);
    } catch {
      // silently ignore — browser blocks storage
    }
  },
  removeItem(key: string): void {
    try {
      getStorage("session")?.removeItem(key);
    } catch {
      // silently ignore
    }
  },
};

export const safeLocal = {
  getItem(key: string): string | null {
    try {
      return getStorage("local")?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      getStorage("local")?.setItem(key, value);
    } catch {
      // silently ignore
    }
  },
  removeItem(key: string): void {
    try {
      getStorage("local")?.removeItem(key);
    } catch {
      // silently ignore
    }
  },
};
