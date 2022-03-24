import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import isEqual from 'react-fast-compare';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

import { PostDelayProps } from './type';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const DURATION = 250;
const transition = (
  <Transition.Together>
    <Transition.Out
      type="fade"
      interpolation="easeInOut"
      durationMs={DURATION}
    />
    <Transition.Change interpolation="easeInOut" durationMs={DURATION} />
    <Transition.In type="fade" durationMs={DURATION} interpolation="easeOut" />
  </Transition.Together>
);

const PostDelayComponent = ({ children }: PostDelayProps) => {
  // state
  const [loaded, setLoaded] = useState<boolean>(false);
  const postDelayViewRef = useRef<TransitioningView>(null);
  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      postDelayViewRef.current?.animateNextTransition();
      setLoaded(true);
    }, 0);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // render
  return (
    <Transitioning.View
      style={[styles.container]}
      transition={transition}
      ref={postDelayViewRef}>
      {loaded ? children : null}
    </Transitioning.View>
  );
};
export const PostDelay = memo(PostDelayComponent, isEqual);
