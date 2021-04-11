import { useCallback, useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';
import { ThemeMode, ThemeState } from '../models/models';

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
