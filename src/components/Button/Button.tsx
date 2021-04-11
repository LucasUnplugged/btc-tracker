import * as React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ButtonProps {
  children: string | React.ReactNode;
  onClick: (event: ClickEvent) => void;
  'aria-label'?: string;
  title?: string;
  width?: string;
}

export default function Button(props: ButtonProps) {
  const { children, onClick, title, width } = props;
  const ariaLabel = props['aria-label'] ? props['aria-label'] : title;
  const {
    isDark,
    theme: { color, fontSize, padding, radius },
  } = useTheme();

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (event: ClickEvent): void => {
      const isButton = (document.activeElement as HTMLInputElement).type === 'button';
      // If this was an actual click event, clear its focus, to avoid
      // a "sticky hover state" effect.
      if (event.detail && isButton) {
        (document.activeElement as HTMLElement).blur();
      }
      onClick(event);
    },
    [onClick]
  );

  return (
    <button
      aria-label={ariaLabel}
      css={css`
        align-items: center;
        background: none;
        border: 2px solid transparent;
        border-color: ${isDark ? color.primary300 : color.primary600};
        border-radius: ${radius.lg};
        color: ${isDark ? color.primary300 : color.primary600};
        cursor: pointer;
        display: flex;
        font-weight: 500;
        height: 40px;
        padding: ${padding.sm} ${padding.xl};
        font-size: ${fontSize.lg};
        ${width ? `width: ${width};` : ''}

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
      onClick={clickHandler}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}
