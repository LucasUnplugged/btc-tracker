import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Colors, dark, light } from './colors';

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
}

interface Sizes {
  xs?: string;
  sm: string;
  md: string;
  lg: string;
  xl?: string;
  xxl?: string;
  xxxl?: string;
}

interface Radii extends Sizes {
  full?: string;
  none?: string;
}

export interface Theme {
  color: Colors;
  fontSize: Sizes;
  lineHeight: Sizes;
  padding: Sizes;
  radius: Radii;
}

interface ThemeState {
  mode: ThemeMode;
  theme: Theme;
  toggleMode: () => void;
}

// Get system color mode as the default
const defaultMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeMode.dark
    : ThemeMode.light;

interface ThemeContextState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: Theme;
}

const defaultTheme = {
  color: defaultMode === ThemeMode.dark ? dark : light,
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

export const ThemeContext = createContext<ThemeContextState>({
  mode: defaultMode,
  setMode: (mode: ThemeMode): void => {},
  theme: defaultTheme,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const theme = useMemo((): Theme => {
    const out: Theme = {
      ...defaultTheme,
      color: mode === ThemeMode.dark ? dark : light,
    };
    return out;
  }, [mode]);

  useEffect(() => {
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
};

export const useTheme = (): ThemeState => {
  const { mode, setMode, theme } = useContext(ThemeContext);

  const toggleMode = useCallback((): void => {
    if (mode === ThemeMode.light) {
      window.localStorage.setItem('mode', ThemeMode.dark);
      setMode(ThemeMode.dark);
    } else {
      window.localStorage.setItem('mode', ThemeMode.light);
      setMode(ThemeMode.light);
    }
  }, [mode, setMode]);

  return { mode, theme, toggleMode };
};
