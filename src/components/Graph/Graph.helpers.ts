import { GraphTheme, Theme } from '../../shared/models/models';

// GRAPH STYLES /////////////////////////////////////////////////////////////////////////////////
export const getGraphTheme = (isDark: boolean, theme: Theme): GraphTheme => {
  const { color, font } = theme;
  // Colors
  const altNeutral = isDark ? color.neutral400 : color.neutral300;
  const mainNeutral = isDark ? color.neutral300 : color.neutral500;
  const textNeutral = isDark ? color.neutral100 : color.neutral700;
  const colors = Object.entries(color)
    .filter(([name]: [string, string]): boolean => name.includes('primary'))
    .map(([name, value]: [string, string]): string => value);
  // Layout
  const baseProps = {
    width: 500,
    height: 300,
    padding: 40,
    colorScale: colors,
  };
  // Labels
  const baseLabelStyles = {
    fontFamily: font.body,
    fontSize: 10,
    fontWeight: 300,
    letterSpacing: 'normal',
    padding: 10, //{ x: [5, 20], y: [20, 5] }
    fill: mainNeutral,
    stroke: 'transparent',
  };
  const centeredLabelStyles = { ...baseLabelStyles, textAnchor: 'middle' };
  // Strokes
  const strokeLinecap = 'round';
  const strokeLinejoin = 'round';

  // Return the theme
  return {
    area: {
      ...baseProps,
      style: {
        data: {
          fill: isDark ? color.primary500 : color.primary600,
          stroke: isDark ? color.primary400 : color.primary600,
        },
        labels: baseLabelStyles,
      },
    },
    axis: {
      ...baseProps,
      style: {
        axis: {
          fill: 'transparent',
          stroke: altNeutral,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: {
          ...centeredLabelStyles,
          padding: 25,
        },
        grid: {
          fill: 'none',
          stroke: 'none',
          pointerEvents: 'painted',
        },
        ticks: {
          fill: 'transparent',
          size: 2,
          // stroke: altNeutral,
          stroke: 'transparent',
        },
        tickLabels: baseLabelStyles,
      },
    },
    chart: baseProps,
    errorbar: {
      ...baseProps,
      borderWidth: 8,
      style: {
        data: {
          fill: 'transparent',
          stroke: mainNeutral,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    group: {
      ...baseProps,
      colorScale: colors,
      style: {
        data: { strokeWidth: 1.5 },
      },
    },
    histogram: {
      ...baseProps,
      style: {
        data: {
          fill: altNeutral,
          stroke: mainNeutral,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    legend: {
      colorScale: colors,
      gutter: 10,
      orientation: 'vertical',
      titleOrientation: 'top',
      style: {
        data: {
          type: 'circle',
        },
        labels: baseLabelStyles,
        title: { ...baseLabelStyles, padding: 5 },
      },
    },
    line: {
      ...baseProps,
      style: {
        data: {
          fill: 'transparent',
          stroke: mainNeutral,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    tooltip: {
      style: { ...baseLabelStyles, padding: 0, pointerEvents: 'none' },
      flyoutStyle: {
        stroke: mainNeutral,
        strokeWidth: 1,
        fill: textNeutral,
        pointerEvents: 'none',
      },
      flyoutPadding: 5,
      cornerRadius: 5,
      pointerLength: 10,
    },
  };
};
// END OF GRAPH STYLES //////////////////////////////////////////////////////////////////////////
