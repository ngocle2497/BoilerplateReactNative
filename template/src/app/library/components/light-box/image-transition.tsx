import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet} from 'react-native';
import {Source} from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {GestureHOC} from './gesture-hoc';

import {Measure} from '.';

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.6)',
  },
});

export interface ImageTransitionProps {
  image: Measure;
  source: Source | number;
}

const ImageTransitionComponent = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: (data: ImageTransitionProps) => {
        setImage(data);
      },
    }),
    [],
  );

  // state
  const [image, setImage] = useState<ImageTransitionProps | null>(null);

  // reanimated
  const backDropOpacity = useSharedValue(0);

  // reanimated style
  const backDropStyle = useAnimatedStyle(() => ({
    opacity: backDropOpacity.value,
  }));

  // function
  const _onClose = useCallback(() => {
    setImage(null);
  }, []);

  // render
  return image ? (
    <Animated.View style={[StyleSheet.absoluteFillObject]}>
      <Animated.View style={[styles.backdrop, backDropStyle]} />
      <GestureHOC
        {...image}
        backDropOpacity={backDropOpacity}
        onClose={_onClose}
      />
    </Animated.View>
  ) : null;
});
export interface ImageTransition {
  show: (data: ImageTransitionProps) => void;
}
export const imageTransitionRef = createRef<ImageTransition>();

export const ImageTransition = memo(
  () => <ImageTransitionComponent ref={imageTransitionRef} />,
  isEqual,
);
