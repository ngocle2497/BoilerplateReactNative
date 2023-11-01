import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { FadeIn } from 'react-native-reanimated';

import { AnimatedView } from '@rn-core';

import { PostDelayProps } from './type';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DURATION = 300;

export const PostDelay = ({
  children,
  durationMs = DURATION,
}: PostDelayProps) => {
  // state
  const [loaded, setLoaded] = useState<boolean>(false);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      setLoaded(true);
    }, 0);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // render
  return loaded ? (
    <AnimatedView
      entering={FadeIn.duration(durationMs)}
      style={[styles.container]}>
      {children}
    </AnimatedView>
  ) : null;
};
