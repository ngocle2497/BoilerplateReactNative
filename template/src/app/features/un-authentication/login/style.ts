import { StyleSheet } from 'react-native';

import { AppTheme } from '@theme';
export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
    },
  });
