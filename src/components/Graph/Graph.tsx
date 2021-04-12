import * as React from 'react';
import { css } from '@emotion/react';
import { GraphTheme, PriceState, StockGraphPoint } from '../../shared/models/models';
import { dataReducer, DataReducer } from './Graph.reducer';
import { VictoryArea, VictoryChart, VictoryGroup } from 'victory';
import { useTheme } from '../../shared/hooks/useTheme';
import { formatPriceCompact, formatTime, getGraphTheme } from './Graph.helpers';
import { convertHexToRGBA } from '../../shared/styles/colors';
import { VictoryAxis } from 'victory';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';

interface GraphProps {
  currentDate: number;
  initialDate: number;
  price: PriceState;
}

export default function Graph(props: GraphProps) {
  const { currentDate, initialDate, price } = props;
  const [data, dispatcher] = React.useReducer<DataReducer>(dataReducer, {
    averageCount: 0,
    averageTotal: 0,
    average: [],
    stock: [],
  });
  const {
    isDark,
    theme,
    theme: { color },
  } = useTheme();

  const interpolation = 'step'; // 'catmullRom'
  const graphTheme = React.useMemo((): GraphTheme => getGraphTheme(isDark, theme), [isDark, theme]);
  const graphAverageColor = React.useMemo(
    (): string => (isDark ? color.neutral400 : color.neutral400),
    [color, isDark]
  );
  const graphPriceColor = React.useMemo(
    (): string => (isDark ? color.primary500 : color.primary600),
    [color, isDark]
  );

  React.useEffect((): void => {
    const point: StockGraphPoint = {
      price: price.current,
      timestamp: new Date().getTime(),
    };
    dispatcher({ type: 'ADD_DATA_POINT', point });
  }, [price]);

  const isViewXXXL = useMediaQuery('(min-width: 1500px)');
  const isViewXXL = useMediaQuery('(min-width: 1250px)');
  const isViewXL = useMediaQuery('(min-width: 1100px)');
  const isViewLG = useMediaQuery('(min-width: 1000px)');
  const isViewMD = useMediaQuery('(min-width: 900px)');
  const isViewSM = useMediaQuery('(min-width: 800px)');
  const isViewXS = useMediaQuery('(min-width: 700px)');
  const isViewXXS = useMediaQuery('(min-width: 600px)');
  const sizeMod = isViewXXXL
    ? 0.75
    : isViewXXL
    ? 0.9
    : isViewXL
    ? 1.1
    : isViewLG
    ? 1.3
    : isViewMD
    ? 1.5
    : isViewSM
    ? 1.7
    : isViewXS
    ? 1.9
    : isViewXXS
    ? 2.1
    : 2.3;
  const rightPadding = 35;

  return (
    <figure
      css={css`
        margin: 0 calc(${101 + 6 * sizeMod}px - ${(rightPadding * sizeMod) / 5}%) 0 0;
        padding: 0;
      `}
    >
      <svg
        css={css`
          height: 0;
          pointer-events: none;
          position: absolute;
          visibility: hidden;
        `}
      >
        <defs>
          <linearGradient id="average-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={convertHexToRGBA(graphAverageColor, 50)} />
            <stop offset="100%" stopColor={convertHexToRGBA(graphAverageColor, 0)} />
          </linearGradient>
          <linearGradient id="price-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={convertHexToRGBA(graphPriceColor, 50)} />
            <stop offset="100%" stopColor={convertHexToRGBA(graphPriceColor, 0)} />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        animate={{ duration: 500, onLoad: { duration: 350 } }}
        domain={{ x: [initialDate, currentDate], y: [40000, 65000] }}
        height={245 * sizeMod}
        padding={{
          top: 20 * sizeMod,
          bottom: 30 * sizeMod,
          left: 15 * sizeMod,
          right: rightPadding * sizeMod,
        }}
        scale={{ x: 'time' }}
        theme={graphTheme}
      >
        <VictoryAxis
          fixLabelOverlap
          label="Time"
          style={{
            axisLabel: { fontSize: 7 * sizeMod, fontWeight: 500, padding: 20 * sizeMod },
            tickLabels: { fontSize: 7 * sizeMod, padding: 5 * sizeMod },
          }}
          tickFormat={formatTime}
        />
        <VictoryAxis
          dependentAxis
          orientation="right"
          style={{
            tickLabels: { fontSize: 7 * sizeMod, padding: 5 * sizeMod },
          }}
          tickFormat={formatPriceCompact}
        />
        <VictoryGroup
          style={{
            data: { strokeWidth: 1 * sizeMod },
          }}
        >
          <VictoryArea
            style={{
              data: {
                fill: 'url(#average-gradient)',
                stroke: isDark ? color.neutral400 : color.neutral300,
              },
            }}
            interpolation="catmullRom"
            data={data.average}
            x="timestamp"
            y="price"
          />
          <VictoryArea
            style={{
              data: { fill: 'url(#price-gradient)' },
            }}
            interpolation={interpolation}
            data={data.stock}
            x="timestamp"
            y="price"
          />
        </VictoryGroup>
      </VictoryChart>
    </figure>
  );
}
