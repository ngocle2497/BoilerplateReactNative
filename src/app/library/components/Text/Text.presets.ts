import * as React from 'react'
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../../../config/type';
import { StyleSheet } from 'react-native';

export const styles = () => {
  const theme: AppTheme = useTheme();
  return React.useMemo(() => StyleSheet.create({
    default: {
      fontFamily: theme.fontFamily.primary,
      color: theme.colors.text,
      fontSize: theme.fontSize.FONT_15,
    },
    bold: {
      fontFamily: theme.fontFamily.primary,
      color: theme.colors.text,
      fontSize: theme.fontSize.FONT_15,
      fontWeight: 'bold'
    },
    header: {
      fontFamily: theme.fontFamily.primary,
      color: theme.colors.text,
      fontSize: theme.fontSize.FONT_24,
      fontWeight: 'bold'
    },
    fieldLabel: {
      fontFamily: theme.fontFamily.primary,
      fontSize: theme.fontSize.FONT_13,
      color: theme.colors.lighterGrey
    },
    secondary: {
      fontFamily: theme.fontFamily.primary,
      fontSize: theme.fontSize.FONT_9,
      color: theme.colors.lighterGrey
    }
  }), [theme])
}

export type TextPresets = 'default' | 'bold' | 'header' | 'fieldLabel' | 'secondary';
