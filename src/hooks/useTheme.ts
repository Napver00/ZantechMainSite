import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const KEY = 'theme';
const listeners = new Set<() => void>();

const read = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export const setTheme = (theme: Theme) => {
  const root = document.documentElement;
  // Animate colours only for the switch itself, not on every hover.
  root.classList.add('theme-transition');
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f7fb' : '#0b0f19');
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode — theme just won't persist */
  }
  window.setTimeout(() => root.classList.remove('theme-transition'), 300);
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

// Current theme and a toggle, shared by every component.
export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, read, (): Theme => 'light');
  return { theme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') };
};
