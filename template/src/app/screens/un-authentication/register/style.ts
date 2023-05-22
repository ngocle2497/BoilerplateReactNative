import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';

export const useRegisterStyle = () => {
  // state
  const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          color: theme.colors.text,
        },
      }),
    [theme.colors.text],
  );
};
