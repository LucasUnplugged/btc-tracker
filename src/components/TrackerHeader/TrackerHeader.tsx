import * as React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';
import { PriceState, ThemeMode } from '../../shared/models/models';
import CountUp from 'react-countup';

interface TrackerHeaderProps {
  price: PriceState;
}

export default function TrackerHeader(props: TrackerHeaderProps) {
  const {
    price: { current, delta, previous },
  } = props;
  const {
    mode,
    theme: { color, padding, radius },
  } = useTheme();
  const isDark = mode === ThemeMode.dark;

  // Price formatter, which could be fully localized
  const formatPriceCompact = React.useCallback(
    (price: number): string =>
      price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
      }),
    []
  );
  const formatPrice = React.useCallback(
    (price: number): string =>
      price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    []
  );

  const arrow = React.useMemo((): React.ReactNode => {
    const isPlus = delta > 0;
    const isMinus = delta < 0;
    const deltaClass = delta > 0 ? 'plus' : delta < 0 ? 'minus' : 'equal';
    return (
      <div
        className={deltaClass}
        css={css`
          align-items: center;
          background: none;
          border: 2px solid transparent;
          ${isPlus
            ? `border-color: ${color.success};`
            : isMinus
            ? `border-color: ${color.error};`
            : `border-color: ${isDark ? color.white : color.black};`}
          border-radius: ${radius.lg};
          display: flex;
          height: 90px;
          justify-content: center;
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
              ? `background: ${color.success};`
              : isMinus
              ? `background: ${color.error};`
              : `background: ${isDark ? color.white : color.black};`}
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
  }, [color, delta, isDark, radius]);

  return (
    <header
      css={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
      <section
        css={css`
          margin-right: ${padding.lg};
        `}
      >
        <h2
          css={css`
            font-size: 50px;
            font-weight: 600;
            margin-bottom: ${padding.sm};
          `}
        >
          {/* Provide "reduced motion" alternatives, for improved accessibility */}
          <span
            css={css`
              display: inline-block;
              @media (prefers-reduced-motion: no-preference) {
                display: none;
              }
            `}
          >
            {formatPriceCompact(current)}
          </span>
          <CountUp
            css={css`
              display: none;
              @media (prefers-reduced-motion: no-preference) {
                display: inline-block;
              }
            `}
            duration={0.25}
            end={current}
            formattingFn={formatPriceCompact}
            start={previous}
          />
        </h2>
        <h3
          css={css`
            display: flex;
            font-size: 23px;
            font-weight: 300;
            justify-content: flex-end;
            margin: 0;
          `}
        >
          {/* Provide "reduced motion" alternatives, for improved accessibility */}
          <span
            css={css`
              display: inline-block;
              @media (prefers-reduced-motion: no-preference) {
                display: none;
              }
            `}
          >
            {formatPrice(current)}
          </span>
          <CountUp
            css={css`
              display: none;
              @media (prefers-reduced-motion: no-preference) {
                display: inline-block;
              }
            `}
            duration={0.25}
            end={current}
            formattingFn={formatPrice}
            start={previous}
          />
        </h3>
      </section>
      {arrow}
    </header>
  );
}
