/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { ViewStyle } from 'react-native';

import Animated, { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sharedTiming } from '@animated';
import { VectorIcon, VectorIconIcon } from '@assets/vector-icon/vector-icon';
import { useErrorMessageTranslation } from '@hooks';

import {
  BG_ERROR,
  BG_LINK,
  BG_SUCCESS,
  BG_WARN,
  DURATION_ANIMATED,
} from './constants';
import { styles } from './styles';
import { SnackBarItemProps, TYPE_MESSAGE, TypeMessage } from './type';

import { Spacer } from '../spacer';
import { Text } from '../text';

const getColor = (typeMessage: TypeMessage): string => {
  switch (typeMessage) {
    case TYPE_MESSAGE.SUCCESS:
      return BG_SUCCESS;
    case TYPE_MESSAGE.LINK:
      return BG_LINK;
    case TYPE_MESSAGE.WARN:
      return BG_WARN;
    case TYPE_MESSAGE.ERROR:
      return BG_ERROR;

    default:
      return BG_SUCCESS;
  }
};

const getIcon = (typeMessage: TypeMessage): VectorIconIcon => {
  switch (typeMessage) {
    case TYPE_MESSAGE.SUCCESS:
      return 'tick_square';

    case TYPE_MESSAGE.LINK:
    case TYPE_MESSAGE.WARN:
      return 'info_circle';

    case TYPE_MESSAGE.ERROR:
      return 'danger';

    default:
      return 'info_circle';
  }
};

export const SnackItem = memo(
  ({ item, onPop }: SnackBarItemProps) => {
    // state
    const insets = useSafeAreaInsets();

    const [isShow, setIsShow] = useState<boolean>(true);

    const message = useErrorMessageTranslation(item.msg);

    // style
    const containStyle = useMemo<ViewStyle>(
      () => ({
        backgroundColor: getColor(item.type),
        paddingTop: insets.top,
      }),
      [insets.top, item.type],
    );

    // function
    const CustomEnteringAnimation = (values: any) => {
      'worklet';
      const animations = {
        // your animations
        transform: [
          { translateY: sharedTiming(0, { duration: DURATION_ANIMATED }) },
        ],
      };

      const initialValues = {
        // initial values for animations
        transform: [{ translateY: -values.targetHeight }],
      };

      const callback = (_: boolean) => {
        // optional callback that will fire when layout animation ends
      };

      return {
        initialValues,
        animations,
        callback,
      };
    };

    const CustomExitAnimation = (values: any) => {
      'worklet';
      const animations = {
        // your animations
        transform: [
          {
            translateY: sharedTiming(-values.currentHeight, {
              duration: DURATION_ANIMATED,
            }),
          },
        ],
      };

      const initialValues = {
        // initial values for animations
        transform: [{ translateY: 0 }],
      };

      const callback = (_: boolean) => {
        runOnJS(onPop)(item);
        // optional callback that will fire when layout animation ends
      };

      return {
        initialValues,
        animations,
        callback,
      };
    };

    // effect
    useEffect(() => {
      const id = setTimeout(() => {
        setIsShow(false);
      }, item.interval + DURATION_ANIMATED);

      return () => {
        clearTimeout(id);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // render
    return isShow ? (
      <Animated.View
        entering={CustomEnteringAnimation}
        exiting={CustomExitAnimation}
        style={[styles.itemBar, containStyle]}>
        <VectorIcon icon={getIcon(item.type)} color="white" />
        <Spacer width={10} />
        <Text style={[styles.text]} preset="linkMedium" color="white">
          {message}
        </Text>
      </Animated.View>
    ) : null;
  },
  () => true,
);
