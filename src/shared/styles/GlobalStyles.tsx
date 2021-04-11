import * as React from 'react';
import { Global, css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';

export default function GlobalStyles() {
  const { isDark, theme } = useTheme();

  const globalStyles = React.useMemo((): React.ReactNode => {
    const { color, font, fontSize, lineHeight, padding } = theme;
    return (
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            font-family: ${font.body};
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
            font-size: ${fontSize.md};
            line-height: ${lineHeight.lg};
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }

          html {
            background: ${isDark ? color.neutral500 : color.neutral100};
          }

          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: ${isDark ? color.white : color.neutral700};
          }

          code {
            font-family: ${font.code};
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

          h1:first-of-type,
          h2:first-of-type,
          h3:first-of-type,
          h4:first-of-type,
          h5:first-of-type,
          h6:first-of-type,
          a:first-of-type,
          p:first-of-type {
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
  }, [isDark, theme]);

  return <>{globalStyles}</>;
}
