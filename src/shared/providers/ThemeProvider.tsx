import * as React from 'react';
import { Theme, ThemeMode } from '../models/models';
import { dark, light } from '../styles/colors';

// Get system color mode as the default
const defaultMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeMode.dark
    : ThemeMode.light;

// Base theme
const baseTheme = {
  color: defaultMode === ThemeMode.dark ? dark : light,
  font: {
    body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    code: `'Fira Code', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    xxl: '27px',
    xxxl: '36px',
  },
  lineHeight: {
    sm: '1.1',
    md: '1.3',
    lg: '1.6',
  },
  padding: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '40px',
  },
  radius: {
    none: 'none',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '100%',
  },
};

interface ThemeContextState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: Theme;
}

export const ThemeContext = React.createContext<ThemeContextState>({
  mode: defaultMode,
  setMode: (mode: ThemeMode): void => {},
  theme: baseTheme,
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [mode, setMode] = React.useState<ThemeMode>(defaultMode);

  const theme = React.useMemo((): Theme => {
    const out: Theme = {
      ...baseTheme,
      color: mode === ThemeMode.dark ? dark : light,
    };
    return out;
  }, [mode]);

  React.useEffect(() => {
    const modeChangeHandler = (ev: MediaQueryListEvent) => {
      const newMode = ev.matches ? ThemeMode.dark : ThemeMode.light;
      setMode(newMode);
    };

    const localMode = window.localStorage.getItem('mode');
    localMode && setMode(localMode as ThemeMode);
    // Watch for system change to the color mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeChangeHandler);
    // Clean-up watcher
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', modeChangeHandler);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme }}>{props.children}</ThemeContext.Provider>
  );
}
