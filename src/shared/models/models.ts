// DATA MODELS ////////////////////////////////////////////////////////////////////////////////////
export interface StockDTO {
  amount: string;
  base: string;
  currency: string;
}

export interface CoinbaseDTO {
  data: StockDTO;
}

// OTHER MODELS ///////////////////////////////////////////////////////////////////////////////////
export interface PriceState {
  current: number;
  delta: number;
  previous: number;
}

// THEME MODELS ///////////////////////////////////////////////////////////////////////////////////
export interface Colors {
  black: string;
  error: string;
  neutral50: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  success: string;
  white: string;
}

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
}

export interface Sizes {
  xs?: string;
  sm: string;
  md: string;
  lg: string;
  xl?: string;
  xxl?: string;
  xxxl?: string;
}

export interface Radii extends Sizes {
  full?: string;
  none?: string;
}

export interface Theme {
  color: Colors;
  fontSize: Sizes;
  lineHeight: Sizes;
  padding: Sizes;
  radius: Radii;
}

export interface ThemeState {
  mode: ThemeMode;
  theme: Theme;
  toggleMode: () => void;
}
