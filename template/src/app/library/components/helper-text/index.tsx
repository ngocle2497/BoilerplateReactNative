import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming, useInterpolate, useSharedTransition } from '@animated';
import { useTheme } from '@theme';
import { ColorDefault } from '@theme/color';

import { styles } from './styles';
import { HelperTextProps } from './type';

export const HelperText = ({
  msg,
  type,
  colorThemeInfo,
  colorThemeError,
  visible = false,
}: HelperTextProps) => {
  // state
  const theme = useTheme();

  const [measured, setMeasured] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const [currentMessage, setCurrentMessage] = useState<string>(msg ?? '');

  const progress = useSharedTransition(visible);

  const height = useSharedValue(0);

  const opacity = useInterpolate(progress, [0, 1], [0, 1]);

  // function
  const _onLayoutContent = (e: LayoutChangeEvent) => {
    setMeasured({ ...e.nativeEvent.layout });
  };

  // style
  const textStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      { height: measured.height },
      type === 'error'
        ? {
            color: colorThemeError
              ? theme.colors[colorThemeError]
              : ColorDefault.error,
          }
        : {
            color: colorThemeInfo
              ? theme.colors[colorThemeInfo]
              : ColorDefault.info,
          },
    ],
    [colorThemeError, colorThemeInfo, measured.height, theme.colors, type],
  );

  // effect
  useEffect(() => {
    if (msg) {
      setCurrentMessage(msg);
    }
  }, [msg]);

  useEffect(() => {
    if (visible) {
      height.value = sharedTiming(measured.height);
    } else {
      height.value = sharedTiming(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measured.height, visible]);

  // reanimated style
  const style = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  // render
  return (
    <View style={[styles.container]}>
      <Animated.View
        pointerEvents={'none'}
        onLayout={_onLayoutContent}
        style={[styles.hiddenView]}>
        <Text style={[styles.text]}>{currentMessage}</Text>
      </Animated.View>
      <Animated.View style={[style]}>
        <Text style={[styles.text, textStyle]}>{currentMessage}</Text>
      </Animated.View>
    </View>
  );
};
