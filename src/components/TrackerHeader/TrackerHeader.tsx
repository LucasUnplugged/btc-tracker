import * as React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '../../shared/hooks/useTheme';
import { PriceState, ThemeMode } from '../../shared/models/models';

interface TrackerHeaderProps {
  price: PriceState;
}

export default function TrackerHeader(props: TrackerHeaderProps) {
  const {
    price: { current, delta },
  } = props;
  const {
    mode,
    theme: { color, radius },
  } = useTheme();
  const isDark = mode === ThemeMode.dark;

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
  }, [delta, isDark]);

  return (
    <header>
      {/*
      - Price
      - Delta arrow
      */}
      <h2>{current.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
      <h3>USD</h3>
      {arrow}
    </header>
  );
}
