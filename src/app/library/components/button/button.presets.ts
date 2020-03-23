import { AppTheme } from './../../../config/type';
import { useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native'
export const stylesView = () => {
  const theme: AppTheme = useTheme()
  return useMemo(() => StyleSheet.create({
    primary: {
      paddingVertical: theme.spacing.smaller,
      paddingHorizontal: theme.spacing.smaller,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.button,
    },
    link: {
      borderRadius: 4,
      justifyContent: 'center',
      paddingHorizontal: 0,
      paddingVertical: 0,
      alignItems: 'flex-start',
    }
  }), [theme])
}
export const stylesText = () => {
  const theme: AppTheme = useTheme()
  return useMemo(() => StyleSheet.create({
    primary: {
      paddingHorizontal: theme.spacing.small,
      fontSize: theme.fontSize.FONT_9,
      color: theme.colors.white,
    },
    link: {
      fontSize: theme.fontSize.FONT_9,
      color: theme.colors.text,
      paddingHorizontal: 0,
      paddingVertical: 0,
    }
  }), [theme])
}
export type ButtonPresetNames = 'link' | 'primary';
