import * as React from 'react';
import { Global, css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';
import { ThemeMode } from '../../shared/models/models';

export default function GlobalStyles() {
  const { mode, theme } = useTheme();

  const globalStyles = React.useMemo((): React.ReactNode => {
    const { color, fontSize, lineHeight, padding } = theme;
    const isDark = mode === ThemeMode.dark;
    return (
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            font-family: 'Libre Franklin', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
              sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-size: ${fontSize.md};
          }

          *::selection {
            background: ${color.primary500};
            color: ${color.white};
          }

          html,
          body,
          p,
          li,
          a {
            line-height: ${lineHeight.lg};
          }

          html,
          body {
            margin: 0;
          }

          html {
            background: ${isDark ? color.neutral500 : color.neutral100};
          }

          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: ${isDark ? color.white : color.neutral700};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
              'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            padding: ${padding.xxl};
          }

          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          a,
          p {
            margin: ${padding.xl} 0;
          }

          h1:first-child,
          h2:first-child,
          h3:first-child,
          h4:first-child,
          h5:first-child,
          h6:first-child,
          a:first-child,
          p:first-child {
            margin-top: 0;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            line-height: ${lineHeight.sm};
          }

          h1 {
            font-size: ${fontSize.xxxl};
          }

          h2 {
            font-size: ${fontSize.xxl};
          }

          h3 {
            font-size: ${fontSize.xl};
          }

          h4 {
            font-size: ${fontSize.lg};
          }

          a {
            color: ${isDark ? color.primary300 : color.primary600};
          }
        `}
      />
    );
  }, [mode, theme]);

  return <>{globalStyles}</>;
}