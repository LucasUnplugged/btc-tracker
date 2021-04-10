import * as React from 'react';
import { css } from '@emotion/react';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { ThemeMode, useTheme } from '../../shared/styles/useTheme';

type ClickEvent = React.MouseEvent<Element, MouseEvent>;

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const {
    mode,
    theme: { color, fontSize, padding, radius },
    toggleMode,
  } = useTheme();
  const isDark = mode === ThemeMode.dark;
  const Icon = isDark ? RiSunLine : RiMoonLine;
  const target = isDark ? 'light' : 'dark';
  const title = `Switch to ${target} mode`;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (event: ClickEvent): void => {
      const isButton = (document.activeElement as HTMLInputElement).type === 'button';
      // If this was an actual click event, clear its focus, to avoid
      // a "sticky hover state" effect.
      if (event.detail && isButton) {
        (document.activeElement as HTMLElement).blur();
      }
      toggleMode();
    },
    [toggleMode]
  );

  return (
    <header
      css={css`
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: ${padding.xxl};
      `}
    >
      <h1
        css={css`
          margin: 0;
        `}
      >
        BitCoiner
      </h1>
      <button
        aria-label={title}
        css={css`
          align-items: center;
          background: none;
          border: 2px solid transparent;
          border-color: ${isDark ? color.primary300 : color.primary600};
          border-radius: ${radius.lg};
          color: ${isDark ? color.primary200 : color.primary700};
          cursor: pointer;
          display: flex;
          font-weight: 500;
          height: 40px;
          padding: ${padding.sm} ${padding.xl};
          font-size: ${fontSize.lg};

          &:focus,
          &:hover {
            background: ${isDark ? color.primary300 : color.primary600};
            color: ${isDark ? color.neutral600 : color.white};
            outline: none;
          }

          .icon {
            margin-right: ${padding.sm};
          }
        `}
        onClick={onClick}
        title={title}
        type="button"
      >
        <Icon className="icon" /> {target}
      </button>
    </header>
  );
}
