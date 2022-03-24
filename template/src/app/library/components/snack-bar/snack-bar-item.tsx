/* eslint-disable no-undef */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming, useSharedTransition } from '@animated';

import {
  BG_ERROR,
  BG_INFO,
  BG_SUCCESS,
  BG_WARN,
  DURATION_ANIMATED,
} from './constants';
import { styles } from './styles';
import { SnackBarItemProps, TypeMessage } from './type';

const getColor = (
  typeMessage: TypeMessage,
  borderLeftColor: Omit<SnackBarItemProps, 'item' | 'onPop'>,
): string => {
  const {
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
  } = borderLeftColor;
  switch (typeMessage) {
    case 'success':
      return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
    case 'info':
      return borderLeftColorInfo ? borderLeftColorInfo : BG_INFO;
    case 'warn':
      return borderLeftColorWarn ? borderLeftColorWarn : BG_WARN;
    case 'error':
      return borderLeftColorError ? borderLeftColorError : BG_ERROR;
    default:
      return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
  }
};

export const SnackItem = memo(
  ({
    item,
    onPop,
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
  }: SnackBarItemProps) => {
    // state
    const [isShow, setIsShow] = useState<boolean>(true);

    // reanimated
    const opacity = useSharedTransition(isShow, {
      duration: DURATION_ANIMATED,
    });
    const translateY = useSharedValue(-150);
    const translateX = useSharedValue(0);

    // function
    const _onClose = useCallback(() => {
      setIsShow(false);
    }, []);

    // effect
    useEffect(() => {
      const id = setTimeout(() => {
        setIsShow(false);
      }, item.interval + DURATION_ANIMATED);

      return () => {
        clearTimeout(id);
      };
    }, [item.interval]);

    useEffect(() => {
      if (isShow) {
        translateY.value = sharedTiming(10, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      } else {
        translateX.value = sharedTiming(-999, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow]);

    useEffect(() => {
      let id: NodeJS.Timeout | null = null;
      if (!isShow) {
        id = setTimeout(() => {
          onPop(item);
        }, DURATION_ANIMATED);
      }
      return () => {
        if (id) {
          clearTimeout(id);
        }
      };
    }, [isShow, item, onPop]);

    // animated style
    const itemBarAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
      opacity: opacity.value,
    }));

    // render
    return (
      <Animated.View
        style={[
          styles.itemBar,
          itemBarAnimatedStyle,
          {
            borderLeftColor: getColor(item.type, {
              borderLeftColorError,
              borderLeftColorInfo,
              borderLeftColorSuccess,
              borderLeftColorWarn,
            }),
          },
        ]}>
        <Text style={[styles.text]}>{item.msg}</Text>
        <Animated.View>
          <TouchableOpacity onPress={_onClose}>
            <Text>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  },
  () => true,
);
