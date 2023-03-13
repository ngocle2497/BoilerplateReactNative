import React, { memo, useCallback, useEffect } from 'react';
import { BackHandler, useWindowDimensions } from 'react-native';

import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  WithTimingConfig,
} from 'react-native-reanimated';

import { sharedTiming, useInterpolate, useVector } from '@animated';

import { styles } from './styles';
import { GestureHOCProps } from './type';

const timingConfig: WithTimingConfig = {
  duration: 300,
};

export const GestureHOC = memo(
  ({ image, source, onClose, backDropOpacity }: GestureHOCProps) => {
    // state
    const { height: heightDevice } = useWindowDimensions();

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

    // function
    const onEndAnimatedClose = useCallback(
      (finished?: boolean) => {
        'worklet';
        if (finished) {
          image.imageOpacity.value = 1;

          runOnJS(onClose)();
        }
      },
      [image.imageOpacity, onClose],
    );

    const closeLightBox = useCallback(() => {
      targetX.value = translateX.value - targetX.value * -1;

      targetY.value = translateY.value - targetY.value * -1;

      translateX.value = 0;

      translateY.value = 0;

      backDropOpacity.value = sharedTiming(0, timingConfig);

      animatedProgress.value = sharedTiming(
        0,
        timingConfig,
        onEndAnimatedClose,
      );
    }, [
      animatedProgress,
      backDropOpacity,
      onEndAnimatedClose,
      targetX,
      targetY,
      translateX,
      translateY,
    ]);

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
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
      })
      .onEnd(() => {
        if (Math.abs(translateY.value) > 40) {
          runOnJS(closeLightBox)();
        } else {
          backDropOpacity.value = sharedTiming(1, timingConfig);

          translateX.value = sharedTiming(0, timingConfig);

          translateY.value = sharedTiming(0, timingConfig);
        }

        scale.value = sharedTiming(1, timingConfig);
      });

    const onBackButtonPress = useCallback(() => {
      closeLightBox();

      return true;
    }, [closeLightBox]);

    // effect
    useEffect(() => {
      runOnUI(() => {
        'worklet';
        image.imageOpacity.value = 0;

        animatedProgress.value = sharedTiming(1, timingConfig);

        backDropOpacity.value = sharedTiming(1, timingConfig);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // reanimated style
    const imageStyle = useAnimatedStyle(() => ({
      left: left.value,
      top: top.value,
      width: width.value,
      height: height.value,
      transform: [{ scale: scale.value }],
    }));

    // render
    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[imageStyle]}>
          <FastImage
            style={[styles.img]}
            resizeMode={'cover'}
            source={source}
          />
        </Animated.View>
      </GestureDetector>
    );
  },
  isEqual,
);
