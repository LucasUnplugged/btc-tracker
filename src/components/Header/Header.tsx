import { css } from '@emotion/react';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from '../../shared/hooks/useTheme';
import { ThemeMode } from '../../shared/models/models';
import Button from '../Button/Button';

export default function Header() {
  const {
    mode,
    theme: { color, fontSize, padding },
    toggleMode,
  } = useTheme();
  const isDark = mode === ThemeMode.dark;
  const Icon = isDark ? RiSunLine : RiMoonLine;
  const target = isDark ? 'light' : 'dark';
  const title = `Switch to ${target} mode`;

  return (
    <header
      css={css`
        align-items: center;
        background: ${isDark ? color.neutral700 : color.neutral200};
        display: flex;
        justify-content: space-between;
        padding: ${padding.xl} ${padding.xxl};
      `}
    >
      <h1
        css={css`
          color: ${isDark ? color.neutral100 : color.neutral700};
          line-height: ${fontSize.xxxl};
          font-weight: 200;
          margin: 0;
        `}
      >
        BitCoiner
      </h1>
      <Button onClick={toggleMode} title={title}>
        <Icon className="icon" /> {target}
      </Button>
    </header>
  );
}
