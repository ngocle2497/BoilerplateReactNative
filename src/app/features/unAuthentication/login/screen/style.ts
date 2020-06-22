import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
export const styles = () => {
  const theme: AppTheme = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          color: theme.colors.text,
        },
      }),
    [theme],
  );
};
