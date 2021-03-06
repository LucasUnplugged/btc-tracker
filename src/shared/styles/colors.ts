import { Colors } from '../models/models';

export const dark: Colors = {
  black: '#030405',
  error: '#fd5730',
  neutral50: '#e5e5e6',
  neutral100: '#c1c1c2',
  neutral200: '#9a9a9b',
  neutral300: '#6a6a70',
  neutral400: '#484a54',
  neutral500: '#282a36',
  neutral600: '#242530',
  neutral700: '#1e1f29',
  neutral800: '#181922',
  neutral900: '#0f0f16',
  primary50: '#fae9ff',
  primary100: '#e6c5ef',
  primary200: '#d59fe1',
  primary300: '#c67ad3',
  primary400: '#b854c5',
  primary500: '#a23aab',
  primary600: '#792c86',
  primary700: '#521f60',
  primary800: '#2f113b',
  primary900: '#110318',
  success: '#10aa30',
  white: '#f3f3f3',
};

export const light: Colors = {
  black: '#030405',
  error: '#be1c0f',
  neutral50: '#f7f7f8',
  neutral100: '#dbdbdd',
  neutral200: '#bdbec0',
  neutral300: '#a0a2a6',
  neutral400: '#838794',
  neutral500: '#6a6e7b',
  neutral600: '#525560',
  neutral700: '#3b3d46',
  neutral800: '#22252c',
  neutral900: '#0b0d16',
  primary50: '#fae9ff',
  primary100: '#e6c5ef',
  primary200: '#d59fe1',
  primary300: '#c67ad3',
  primary400: '#b854c5',
  primary500: '#a23aab',
  primary600: '#792c86',
  primary700: '#521f60',
  primary800: '#2f113b',
  primary900: '#110318',
  success: '#0f711a',
  white: '#f3f3f3',
};

export const convertHexToRGBA = (hexCode: string, opacity: number): string => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};
