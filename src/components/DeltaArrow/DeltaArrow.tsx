import * as React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';
import { ThemeMode } from '../../shared/models/models';

interface DeltaArrowProps {
  delta: number;
}

export default function DeltaArrow(props: DeltaArrowProps) {
  const { delta } = props;
  const {
    mode,
    theme: { color, padding, radius },
  } = useTheme();
  const isDark = mode === ThemeMode.dark;

  const arrow = React.useMemo((): React.ReactNode => {
    const isPlus = delta > 0;
    const isMinus = delta < 0;
    const plusColor = color.success;
    const minusColor = color.error;
    const equalColor = isDark ? color.neutral200 : color.neutral500;
    const title = isPlus
      ? 'Price trending up'
      : isMinus
      ? 'Price trending down'
      : 'Price trend is unchanged';
    return (
      <div
        aria-label={title}
        title={title}
        css={css`
          align-items: center;
          background: none;
          border: 2px solid transparent;
          ${isPlus
            ? `border-color: ${plusColor};`
            : isMinus
            ? `border-color: ${minusColor};`
            : `border-color: ${equalColor};`}
          border-radius: ${radius.lg};
          display: flex;
          height: 90px;
          justify-content: center;
          margin-left: ${padding.lg};
          position: relative;
          width: 90px;

          @media (prefers-reduced-motion: no-preference) {
            &,
            span {
              transition: 0.2s ease-in;
            }
          }

          span {
            ${isPlus
              ? `background: ${plusColor};`
              : isMinus
              ? `background: ${minusColor};`
              : `background: ${equalColor};`}
            bottom: 39%;
            display: block;
            height: 3px;
            left: 25%;
            position: absolute;
            width: 27px;

            &:nth-of-type(2) {
              left: 45%;
            }

            &:nth-of-type(3) {
              bottom: 58%;
            }

            &:nth-of-type(4) {
              left: 45%;
              bottom: 58%;
            }
          }
        `}
      >
        <span
          css={css`
            transform: ${isPlus ? 'rotate(-45deg)' : isMinus ? 'rotate(45deg)' : 'rotate(0deg)'};
          `}
        />
        <span
          css={css`
            transform: ${isPlus ? 'rotate(45deg)' : isMinus ? 'rotate(-45deg)' : 'rotate(0deg)'};
          `}
        />
        <span
          css={css`
            transform: ${isPlus ? 'rotate(135deg)' : isMinus ? 'rotate(225deg)' : 'rotate(180deg)'};
          `}
        />
        <span
          css={css`
            transform: ${isPlus
              ? 'rotate(-135deg)'
              : isMinus
              ? 'rotate(-225deg)'
              : 'rotate(-180deg)'};
          `}
        />
      </div>
    );
  }, [color, delta, isDark, padding, radius]);

  return <>{arrow}</>;
}
