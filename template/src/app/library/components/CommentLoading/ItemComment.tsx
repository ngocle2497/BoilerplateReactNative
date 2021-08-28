import {sharedTiming, useInterpolate} from '@animated';
import React, {memo, useEffect, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';

import {Block} from '../Block/Block';
import {Spacer} from '../Spacer/Spacer';

import {
  DELAY_MS,
  DURATION,
  MAX_HEIGHT_ITEM,
  MAX_WIDTH_ITEM,
  MIN_HEIGHT_ITEM,
  MIN_WIDTH_ITEM,
  SIZE_AVATAR,
} from './constants';
import {ItemCommentProps} from './type';

const ItemCommentComponent = ({index, overlayColor}: ItemCommentProps) => {
  // state
  const widthComment = useMemo<number>(
    () => MIN_WIDTH_ITEM + Math.random() * (MAX_WIDTH_ITEM - MIN_WIDTH_ITEM),
    [],
  );

  const heightComment = useMemo<number>(
    () => MIN_HEIGHT_ITEM + Math.random() * (MAX_HEIGHT_ITEM - MIN_HEIGHT_ITEM),
    [],
  );
  const progress = useSharedValue(0);
  const translateY = useInterpolate(progress, [0, 1], [MAX_HEIGHT_ITEM, 0]);
  const opacity = useInterpolate(progress, [0, 1], [0, 1]);

  // reanimated style
  const wrapStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  // effect
  useEffect(() => {
    progress.value = withDelay(
      index * DELAY_MS,
      sharedTiming(1, {duration: DURATION}),
    );
  }, []);

  // render
  return (
    <Animated.View style={[wrapStyle]}>
      <Block direction={'row'} marginBottom={10}>
        <Block
          color={overlayColor}
          width={SIZE_AVATAR}
          height={SIZE_AVATAR}
          borderRadius={SIZE_AVATAR / 2}
        />
        <Spacer width={10} />
        <Block
          width={widthComment}
          height={heightComment}
          color={overlayColor}
          borderRadius={15}
        />
      </Block>
    </Animated.View>
  );
};

export const ItemComment = memo(ItemCommentComponent, isEqual);
