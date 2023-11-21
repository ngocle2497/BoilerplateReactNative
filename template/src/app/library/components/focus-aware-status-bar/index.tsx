import * as React from 'react';
import { StatusBar, StatusBarProps, StyleSheet } from 'react-native';

import { PostDelay } from '@components/post-delay';
import { useIsFocused } from '@react-navigation/native';
import { View } from '@rn-core';

export const FocusAwareStatusBar = ({
  barStyle = 'dark-content',
  ...props
}: StatusBarProps) => {
  // state
  const isFocused = useIsFocused();

  // render
  return isFocused ? (
    <View style={styles.container}>
      <PostDelay>
        <StatusBar barStyle={barStyle} {...props} />
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
