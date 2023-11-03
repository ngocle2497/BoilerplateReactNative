import { createUnistyles } from 'react-native-unistyles';

import { darkTheme } from './dark';
import { lightTheme } from './light';

export type AppTheme = typeof lightTheme | typeof darkTheme;

export type Colors = keyof AppTheme['color'];
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

export const { createStyleSheet, useStyles } = createUnistyles<
  typeof breakpoints,
  AppTheme
>(breakpoints);
