import * as React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';
import { PriceState, ThemeMode } from '../../shared/models/models';
import { useCountUp } from 'react-countup';

interface TrackerHeaderProps {
  price: PriceState;
}

export default function TrackerHeader(props: TrackerHeaderProps) {
  const {
    price: { current, delta, previous },
  } = props;
  const {
    mode,
    theme: { color, radius },
  } = useTheme();
  const isDark = mode === ThemeMode.dark;

  // ANIMATED PRICE ///////////////////////////////////////////////////////////////////////////////
  // Price formatter, which could be fully localized
  const formatPrice = React.useCallback(
    (price: number): string =>
      price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    []
  );
  // Use a hook to animate changes
  const { countUp: price, start, update } = useCountUp({
    duration: 0.5,
    end: current,
    formattingFn: formatPrice,
    start: previous,
    useEasing: false,
  });
  // Initiate the effect on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(start, []);
  // Update the animation whenever the price changes
  React.useEffect((): void => {
    update(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  // END OF ANIMATED PRICE ////////////////////////////////////////////////////////////////////////

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
          height: 100px;
          justify-content: center;
          position: relative;
          transition: 0.2s ease-in;
          width: 100px;

          span {
            ${isPlus
              ? `background: ${color.success};`
              : isMinus
              ? `background: ${color.error};`
              : `background: ${isDark ? color.white : color.black};`}
            height: 3px;
            transition: 0.2s ease-in;
            width: 30px;

            &:first-of-type {
              display: block;
              position: absolute;
              left: 25%;
              bottom: 39%;
            }

            &:nth-of-type(2) {
              display: block;
              position: absolute;
              left: 45%;
              bottom: 39%;
            }

            &:nth-of-type(3) {
              display: block;
              position: absolute;
              left: 25%;
              bottom: 58%;
            }

            &:nth-of-type(4) {
              display: block;
              position: absolute;
              left: 45%;
              bottom: 58%;
            }
          }
        `}
      >
        <span
          css={
            isPlus
              ? css`
                  transform: rotate(-45deg);
                `
              : isMinus
              ? css`
                  transform: rotate(45deg);
                `
              : css`
                  transform: rotate(0deg);
                `
          }
        />
        <span
          css={
            isPlus
              ? css`
                  transform: rotate(45deg);
                `
              : isMinus
              ? css`
                  transform: rotate(-45deg);
                `
              : css`
                  transform: rotate(0deg);
                `
          }
        />
        <span
          css={
            isPlus
              ? css`
                  transform: rotate(135deg);
                `
              : isMinus
              ? css`
                  transform: rotate(225deg);
                `
              : css`
                  transform: rotate(180deg);
                `
          }
        />
        <span
          css={
            isPlus
              ? css`
                  transform: rotate(-135deg);
                `
              : isMinus
              ? css`
                  transform: rotate(-225deg);
                `
              : css`
                  transform: rotate(-180deg);
                `
          }
        />
      </div>
    );
  }, [color, delta, isDark, radius]);

  return (
    <header>
      <h2>{price}</h2>
      <h3>USD</h3>
      {arrow}
    </header>
  );
}
