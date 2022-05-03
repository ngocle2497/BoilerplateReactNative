import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

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
const transition = (durationMs = DURATION) => (
  <Transition.Together>
    <Transition.Out
      type="fade"
      interpolation="easeInOut"
      durationMs={durationMs}
    />
    <Transition.Change interpolation="easeInOut" durationMs={durationMs} />
    <Transition.In
      type="fade"
      durationMs={durationMs}
      interpolation="easeOut"
    />
  </Transition.Together>
);

export const PostDelay = ({ children, durationMs }: PostDelayProps) => {
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
      transition={transition(durationMs)}
      ref={postDelayViewRef}>
      {loaded ? children : null}
    </Transitioning.View>
  );
};
