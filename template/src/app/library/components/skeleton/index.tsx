import React, { memo, useEffect, useMemo } from 'react';
import { useWindowDimensions, View, ViewStyle } from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import MaskedView from '@react-native-community/masked-view';

import { BaseContent } from './base-content';
import { styles } from './styles';
import { SkeletonProps } from './type';

const SkeletonComponent = ({
  children,
  overlayColor = 'rgba(113, 128, 147, 0.4)',
  linearColor = [
    'rgba(255, 255, 255, 0)',
    'rgba(255, 255, 255, 0.3)',
    '#fff',
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 255, 255, 0)',
  ],
}: SkeletonProps) => {
  // state
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useSharedValue(-screenWidth);

  // reanimated style
  const reLinearStyle = useAnimatedStyle(
    () => ({
      width: screenWidth,
      height: '100%',
      position: 'absolute',
      transform: [{ translateX: translateX.value }],
    }),
    [screenWidth],
  );

  // effect
  useEffect(() => {
    translateX.value = withRepeat(
      sharedTiming(screenWidth, { duration: 2000 }),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // style
  const overlay = useMemo<ViewStyle>(
    () => ({
      flex: 1,
      height: '100%',
      width: screenWidth,
      backgroundColor: overlayColor,
    }),
    [overlayColor, screenWidth],
  );

  // render
  return (
    <MaskedView
      style={[styles.markElement]}
      maskElement={
        <View style={[styles.wrapChildren]}>
          {children ? children : <BaseContent />}
        </View>
      }>
      <View style={[overlay]} />
      <Animated.View style={reLinearStyle}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={linearColor}
          style={styles.linear}
        />
      </Animated.View>
    </MaskedView>
  );
};

export const Skeleton = memo(SkeletonComponent, isEqual);
