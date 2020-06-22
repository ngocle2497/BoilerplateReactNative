import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@config/type';
import {StyleSheet} from 'react-native';
import {useMemo} from 'react';

const RADIUS = 8;
export const styles = () => {
  const theme: AppTheme = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        top: {
          borderWidth: 1,
          borderColor: theme.colors.line,
          padding: theme.spacing.smaller,
          borderTopLeftRadius: RADIUS,
          borderTopRightRadius: RADIUS,
          borderBottomWidth: 0,
        },
        middle: {
          borderWidth: 1,
          borderColor: theme.colors.line,
          padding: theme.spacing.smaller,
          borderBottomWidth: 0,
        },
        bottom: {
          borderWidth: 1,
          borderColor: theme.colors.line,
          padding: theme.spacing.smaller,
          borderBottomLeftRadius: RADIUS,
          borderBottomRightRadius: RADIUS,
        },
        soloRound: {
          borderWidth: 1,
          borderColor: theme.colors.line,
          padding: theme.spacing.smaller,
          borderRadius: RADIUS,
        },
        soloStraight: {
          borderWidth: 1,
          borderColor: theme.colors.line,
          padding: theme.spacing.smaller,
        },
        clear: {
          borderWidth: 1,
          borderColor: theme.colors.line,
          padding: theme.spacing.smaller,
        },
      }),
    [theme],
  );
};

export type FormRowPresets =
  | 'top'
  | 'middle'
  | 'bottom'
  | 'soloRound'
  | 'soloStraight'
  | 'clear';
