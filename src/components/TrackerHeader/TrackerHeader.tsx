import * as React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';
import { PriceState } from '../../shared/models/models';
import CountUp from 'react-countup';
import DeltaArrow from '../DeltaArrow/DeltaArrow';
import { formatPriceCompact, formatPrice } from '../Graph/Graph.helpers';

const COUNTER_DURATION = 0.5;

interface TrackerHeaderProps {
  price: PriceState;
}

export default function TrackerHeader(props: TrackerHeaderProps) {
  const {
    price: { current, delta, previous },
  } = props;
  const {
    isDark,
    theme: { color, padding },
  } = useTheme();

  // COMPOSABLE STYLES ////////////////////////////////////////////////////////////////////////////
  const titleStyles = css`
    font-size: 50px;
    font-weight: 700;
    margin-bottom: ${padding.sm};
  `;
  const subtitleStyles = css`
    font-size: 24px;
    font-weight: 200;
    margin: 0;
  `;
  // END OF COMPOSABLE STYLES /////////////////////////////////////////////////////////////////////

  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        @media (max-width: 680px) {
          flex-direction: column;
        }
      `}
    >
      <section
        css={css`
          @media (max-width: 680px) {
            text-align: right;
            margin: 0 139px ${padding.xxl} 0;
          }
        `}
      >
        <h2 css={titleStyles}>
          BTC
          <span
            css={css`
              font-weight: 300;
              margin-left: ${padding.lg};
            `}
          >
            Bitcoin
          </span>
        </h2>
        <h3 css={subtitleStyles}>In USD</h3>
      </section>
      <section
        css={css`
          display: flex;
          @media (max-width: 680px) {
            justify-content: flex-end;
          }
        `}
      >
        <div
          css={css`
            border-right: 2px solid ${isDark ? color.neutral400 : color.neutral200};
            margin-right: 8px;
            padding-right: 30px;
          `}
        >
          <h2 css={titleStyles}>
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
              duration={COUNTER_DURATION}
              end={current}
              formattingFn={formatPriceCompact}
              start={previous}
            />
          </h2>
          <h3
            css={css`
              ${subtitleStyles};
              display: flex;
              justify-content: flex-end;
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
              duration={COUNTER_DURATION}
              end={current}
              formattingFn={formatPrice}
              start={previous}
            />
          </h3>
        </div>
        <DeltaArrow delta={delta} />
      </section>
    </header>
  );
}
