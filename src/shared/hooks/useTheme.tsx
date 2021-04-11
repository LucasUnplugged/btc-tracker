import * as React from 'react';
import { ThemeContext } from '../providers/ThemeProvider';
import { ThemeMode, ThemeState } from '../models/models';

export const useTheme = (): ThemeState => {
  const { mode, setMode, theme } = React.useContext(ThemeContext);
  const isDark = mode === ThemeMode.dark;

  const toggleMode = React.useCallback((): void => {
    if (mode === ThemeMode.light) {
      window.localStorage.setItem('mode', ThemeMode.dark);
      setMode(ThemeMode.dark);
    } else {
      window.localStorage.setItem('mode', ThemeMode.light);
      setMode(ThemeMode.light);
    }
  }, [mode, setMode]);

  return { isDark, mode, theme, toggleMode };
};
