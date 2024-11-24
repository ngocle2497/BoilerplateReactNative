import * as React from 'react';
import { StyleSheet } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { View } from '@rn-core';
import { StatusBar, StatusBarProps } from 'expo-status-bar';

export const FocusAwareStatusBar = ({
  style = 'dark',
  ...props
}: StatusBarProps) => {
  // state
  const isFocused = useIsFocused();

  // render
  return isFocused ? (
    <View style={styles.container}>
        <StatusBar style={style} {...props} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    opacity: 0,
    position: 'absolute',
  },
});
