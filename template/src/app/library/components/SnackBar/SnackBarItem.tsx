/* eslint-disable no-undef */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {sharedTiming, useSharedTransition} from '@animated';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  DURATION_ANIMATED,
  BG_ERROR,
  BG_INFO,
  BG_SUCCESS,
  BG_WARN,
} from './constants';
import {SnackBarItemProps, TypeMessage} from './type';

const styles = StyleSheet.create({
  itemBar: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 3,
    borderLeftColor: BG_SUCCESS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  text: {
    flex: 1,
  },
});

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
    const opacity = useSharedTransition(isShow, {duration: DURATION_ANIMATED});
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
        {translateY: translateY.value},
        {translateX: translateX.value},
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
