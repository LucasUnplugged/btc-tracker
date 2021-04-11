import { css } from '@emotion/react';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from '../../shared/hooks/useTheme';
import Button from '../Button/Button';

export default function Header() {
  const {
    isDark,
    theme: { color, fontSize, padding },
    toggleMode,
  } = useTheme();
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
        Stock
        <strong
          css={css`
            font-weight: 400;
          `}
        >
          Tracker
        </strong>
      </h1>
      <Button onClick={toggleMode} title={title} width="108px">
        <Icon className="icon" /> {target}
      </Button>
    </header>
  );
}
