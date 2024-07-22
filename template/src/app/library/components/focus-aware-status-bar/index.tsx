import * as React from 'react';
import { StyleSheet } from 'react-native';

import { PostDelay } from '@components/post-delay';
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
      <PostDelay>
        <StatusBar style={style} {...props} />
      </PostDelay>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    opacity: 0,
  },
});
