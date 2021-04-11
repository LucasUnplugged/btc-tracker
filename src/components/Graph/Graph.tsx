import * as React from 'react';
import { css } from '@emotion/react';
import { GraphTheme, PriceState, StockGraphPoint } from '../../shared/models/models';
import { dataReducer, DataReducer } from './Graph.reducer';
import { VictoryArea, VictoryChart, VictoryGroup } from 'victory';
import { useTheme } from '../../shared/hooks/useTheme';
import { getGraphTheme } from './Graph.helpers';
import { convertHexToRGBA } from '../../shared/styles/colors';
import { VictoryAxis } from 'victory';

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

  return (
    <figure
      css={css`
        margin: 0;
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
        padding={{ top: 20, bottom: 40, left: 5, right: 52 }}
        scale={{ x: 'time' }}
        theme={graphTheme}
      >
        <VictoryAxis label="Time (ms)" />
        <VictoryAxis dependentAxis orientation="right" />
        <VictoryGroup>
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
