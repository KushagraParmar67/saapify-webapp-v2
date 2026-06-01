'use client';
import { createContext, useContext } from 'react';

// Minimal shim for next-themes' useTheme — app is always dark (forcedTheme).
// Replaces ThemeProvider to avoid next-themes' <script> tag React 19 warning.
const ThemeCtx = createContext({ theme: 'dark', resolvedTheme: 'dark', systemTheme: 'dark' as const, setTheme: (_: string) => {} });

export const useTheme = () => useContext(ThemeCtx);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeCtx.Provider value={{ theme: 'dark', resolvedTheme: 'dark', systemTheme: 'dark', setTheme: () => {} }}>{children}</ThemeCtx.Provider>;
}
