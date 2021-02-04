import {sharedTiming, useInterpolate, useVector} from '@animated';
import React, {memo, useEffect} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, useWindowDimensions} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {Measure} from './LightBox';

export interface GestureHOCProps {
  image: Measure;
  source: Source | number;
  onClose: () => void;
  backDropOpacity: Animated.SharedValue<number>;
}

const timingConfig: Animated.WithTimingConfig = {
  duration: 300,
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export const GestureHOC = memo(
  ({image, source, onClose, backDropOpacity}: GestureHOCProps) => {
    const {height: heightDevice} = useWindowDimensions();
    const animatedProgress = useSharedValue(0);
    const scale = useSharedValue(1);
    const [targetX, targetY] = useVector({
      x: 0,
      y: (heightDevice - image.targetHeight) / 2,
    });
    const [translateX, translateY] = useVector({
      x: 0,
      y: 0,
    });
    // function
    const _gestureHandler = useAnimatedGestureHandler({
      onActive: (event, _) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;

        scale.value = interpolate(
          translateY.value,
          [-250, 0, 250],
          [0.8, 1, 0.8],
          Extrapolate.CLAMP,
        );

        backDropOpacity.value = interpolate(
          translateY.value,
          [-100, 0, 100],
          [0.6, 1, 0.6],
          Extrapolate.CLAMP,
        );
      },
      onEnd: () => {
        if (Math.abs(translateY.value) > 40) {
          targetX.value = translateX.value - targetX.value * -1;
          targetY.value = translateY.value - targetY.value * -1;

          translateX.value = 0;
          translateY.value = 0;

          backDropOpacity.value = sharedTiming(0, timingConfig);
          animatedProgress.value = sharedTiming(0, timingConfig, () => {
            image.imageOpacity.value = 1;
            runOnJS(onClose)();
          });
        } else {
          backDropOpacity.value = sharedTiming(1, timingConfig);
          translateX.value = sharedTiming(0, timingConfig);
          translateY.value = sharedTiming(0, timingConfig);
        }
        scale.value = sharedTiming(1, timingConfig);
      },
    });

    // effect
    useEffect(() => {
      runOnUI(() => {
        'worklet';
        image.imageOpacity.value = 0;
        animatedProgress.value = sharedTiming(1, timingConfig);
        backDropOpacity.value = sharedTiming(1, timingConfig);
      })();
    }, []);

    const top = useDerivedValue(
      () =>
        translateY.value +
        interpolate(
          animatedProgress.value,
          [0, 1],
          [image.py, targetY.value],
          Extrapolate.CLAMP,
        ),
    );
    const left = useDerivedValue(
      () =>
        translateX.value +
        interpolate(
          animatedProgress.value,
          [0, 1],
          [image.px, targetX.value],
          Extrapolate.CLAMP,
        ),
    );
    const width = useInterpolate(
      animatedProgress,
      [0, 1],
      [image.width, image.targetWidth],
      Extrapolate.CLAMP,
    );
    const height = useInterpolate(
      animatedProgress,
      [0, 1],
      [image.height, image.targetHeight],
      Extrapolate.CLAMP,
    );
    // reanimated style
    const imageStyle = useAnimatedStyle(() => ({
      left: left.value,
      top: top.value,
      width: width.value,
      height: height.value,
      transform: [{scale: scale.value}],
    }));

    return (
      <PanGestureHandler onGestureEvent={_gestureHandler}>
        <Animated.View style={[imageStyle]}>
          <AnimatedFastImage
            style={[styles.image]}
            resizeMode={'contain'}
            source={source}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  },
  isEqual,
);
