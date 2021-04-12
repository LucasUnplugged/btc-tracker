import * as React from 'react';
import { css } from '@emotion/react';
import { GraphTheme, PriceState, StockGraphPoint } from '../../shared/models/models';
import { dataReducer, DataReducer } from './Graph.reducer';
import {
  VictoryArea,
  VictoryChart,
  VictoryClipContainer,
  VictoryGroup,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';
import { useTheme } from '../../shared/hooks/useTheme';
import { formatPriceCompact, formatTime, getGraphTheme, getPriceTooltip } from './Graph.helpers';
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

  // Calculate size modifier for different viewport sizes
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
  const graphTheme = React.useMemo((): GraphTheme => getGraphTheme(isDark, theme), [isDark, theme]);
  const graphPriceColor = React.useMemo(
    (): string => (isDark ? color.primary500 : color.primary600),
    [color, isDark]
  );
  const tooltip = React.useMemo(
    (): React.ReactElement => (
      <VictoryTooltip
        style={{
          fill: isDark ? color.primary800 : color.neutral100,
          fontSize: 9 * sizeMod,
          pointerEvents: 'none',
        }}
        flyoutStyle={{
          fill: convertHexToRGBA(isDark ? color.neutral100 : color.neutral800, 90),
          pointerEvents: 'none',
          stroke: 'transparent',
        }}
        flyoutPadding={{
          top: 4 * sizeMod,
          bottom: 4 * sizeMod,
          left: 7 * sizeMod,
          right: 7 * sizeMod,
        }}
        cornerRadius={2 * sizeMod}
        pointerLength={6 * sizeMod}
      />
    ),
    [color, isDark, sizeMod]
  );

  React.useEffect((): void => {
    const point: StockGraphPoint = {
      price: price.current,
      timestamp: new Date().getTime(),
    };
    dispatcher({ type: 'ADD_DATA_POINT', point });
  }, [price]);

  return (
    <figure
      css={css`
        margin: 0 calc(${106 + 4 * sizeMod}px - ${(rightPadding * sizeMod) / 5}%) 0 0;
        padding: 0;
      `}
    >
      {/* CHART GRADIENTS */}
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
            <stop offset="0%" stopColor={convertHexToRGBA(color.neutral400, 50)} />
            <stop offset="100%" stopColor={convertHexToRGBA(color.neutral400, 0)} />
          </linearGradient>
          <linearGradient id="price-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor={convertHexToRGBA(graphPriceColor, 50)} />
            <stop offset="100%" stopColor={convertHexToRGBA(graphPriceColor, 0)} />
          </linearGradient>
        </defs>
      </svg>

      {/* CHART */}
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
        {/* CHART AXIS */}
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

        {/* STACK OF CHART ELEMENTS */}
        <VictoryGroup
          data={data.average}
          labelComponent={tooltip}
          labels={getPriceTooltip}
          style={{
            data: { strokeWidth: sizeMod },
          }}
          x="timestamp"
          y="price"
        >
          <VictoryArea
            style={{
              data: {
                fill: 'url(#average-gradient)',
                stroke: isDark ? color.neutral400 : color.neutral300,
              },
            }}
            interpolation="catmullRom"
          />
        </VictoryGroup>
        <VictoryGroup
          data={data.stock}
          labelComponent={tooltip}
          labels={getPriceTooltip}
          style={{
            data: { strokeWidth: sizeMod },
          }}
          x="timestamp"
          y="price"
        >
          <VictoryArea
            style={{
              data: { fill: 'url(#price-gradient)' },
            }}
          />
          <VictoryScatter
            groupComponent={<VictoryClipContainer />}
            size={3 * sizeMod}
            style={{
              data: {
                fill: 'transparent',
              },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </figure>
  );
}
