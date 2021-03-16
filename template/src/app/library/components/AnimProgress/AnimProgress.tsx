/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useImperativeHandle, memo, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withRepeat,
  useDerivedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import equals from 'react-fast-compare';
import {useAnimationState} from '@common';
import {sharedTiming} from '@animated';

import {Block} from '../Block/Block';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  wrap: {
    height: 3,
    width: width,
    backgroundColor: 'transparent',
  },
  wrapAnim: {
    height: '100%',
    right: 0,
    position: 'absolute',
  },
});

export interface AnimProcessProps {
  color?: string;
  backgroundColor?: string;
  underStatusbar?: boolean;
}
const AnimProcessComponent = forwardRef((props: AnimProcessProps, ref) => {
  // state
  const [visible, setVisible] = useAnimationState(false);
  const inset = useSafeAreaInsets();
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );
  const {color, backgroundColor = 'transparent', underStatusbar = true} = props;
  // reanimated
  const widthPercent = useSharedValue(0);

  const width1 = useDerivedValue(() =>
    interpolate(widthPercent.value, [0, 0.12], [width, 0]),
  );

  const translateX1 = useDerivedValue(() =>
    interpolate(
      widthPercent.value,
      [0, 0.2, 0.5],
      [-width, width * 1.75, width * 2],
    ),
  );

  const width2 = useDerivedValue(() =>
    interpolate(widthPercent.value, [0, 0.5, 1], [width, width, 0]),
  );

  const translateX2 = useDerivedValue(() =>
    interpolate(
      widthPercent.value,
      [0, 0.2, 0.4, 1],
      [-width, -width, width * 1.5, width * 2],
    ),
  );
  // reanimated style
  const style1 = useAnimatedStyle(() => ({
    width: width1.value,
    transform: [{translateX: translateX1.value}],
    backgroundColor: color ?? '#FFFFFF',
  }));
  const style2 = useAnimatedStyle(() => ({
    width: width2.value,
    transform: [{translateX: translateX2.value}],
    backgroundColor: color ?? '#FFFFFF',
  }));
  // effect
  useEffect(() => {
    if (visible) {
      widthPercent.value = withRepeat(
        sharedTiming(1, {duration: 3500}),
        -1,
        false,
      );
    } else {
      widthPercent.value = 0;
    }
  }, [visible]);

  //render
  return (
    <Block
      color={backgroundColor}
      style={[styles.position, {top: underStatusbar ? inset.top : 0}]}>
      <Block style={[styles.wrap]}>
        <Animated.View style={[styles.wrapAnim, style1]} />
        <Animated.View style={[styles.wrapAnim, style2]} />
      </Block>
    </Block>
  );
});
export const AnimProcess = memo(AnimProcessComponent, equals);
export interface AnimProcessRef {
  show(): void;
  hide(): void;
}
