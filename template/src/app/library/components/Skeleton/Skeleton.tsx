import {sharedTiming} from '@animated';
import MaskedView from '@react-native-community/masked-view';
import React, {memo, useEffect} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, useWindowDimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

import {Block} from '../Block/Block';

import {BaseContent} from './BaseContent';
import {SkeletonProps} from './Skeleton.props';

const styles = StyleSheet.create({
  markElement: {
    width: '100%',
    flexDirection: 'row',
    height: '100%',
  },
  linear: {
    width: '100%',
    height: '100%',
  },
});

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
  const {width: screenWidth} = useWindowDimensions();
  const translateX = useSharedValue(-screenWidth);

  // reanimated style
  const reLinearStyle = useAnimatedStyle(
    () => ({
      width: screenWidth,
      height: '100%',
      position: 'absolute',
      transform: [{translateX: translateX.value}],
    }),
    [screenWidth],
  );

  // effect
  useEffect(() => {
    translateX.value = withRepeat(
      sharedTiming(screenWidth, {duration: 2000}),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <MaskedView
      style={[styles.markElement]}
      maskElement={
        <Block block color={'transparent'}>
          {children ? children : <BaseContent />}
        </Block>
      }>
      <Block block height={'100%'} width={screenWidth} color={overlayColor} />
      <Animated.View style={reLinearStyle}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={linearColor}
          style={styles.linear}
        />
      </Animated.View>
    </MaskedView>
  );
};

export const Skeleton = memo(SkeletonComponent, isEqual);
