import {sharedTiming, useInterpolate, useSharedTransition} from '@animated';
import {enhance} from '@common';
import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';
import {ColorDefault} from '@theme/color';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import equals from 'react-fast-compare';
import {LayoutChangeEvent, LayoutRectangle, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {Block} from '../Block/Block';
import {Text} from '../Text/Text';

import {HelperTextProps} from './HelperText.prop';

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',
  },
  text: {
    fontWeight: 'normal',
  },
  hiddenView: {
    position: 'absolute',
    zIndex: -999,
    opacity: 0,
    // overflow: 'hidden',
  },
});

const HelperTextComponent = (props: HelperTextProps) => {
  // state
  const {visible = false, msg, type, colorThemeError, colorThemeInfo} = props;
  const theme: AppTheme = useTheme();
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
  const _onLayoutContent = useCallback((e: LayoutChangeEvent) => {
    setMeasured({...e.nativeEvent.layout});
  }, []);

  // style
  const textStyle = useMemo(
    () =>
      enhance([
        styles.text,
        {height: measured.height},
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
      ]),
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
    <Block style={[styles.container]}>
      <Animated.View
        pointerEvents={'none'}
        onLayout={_onLayoutContent}
        style={[styles.hiddenView]}>
        <Text style={[styles.text]}>{currentMessage}</Text>
      </Animated.View>
      <Animated.View style={[style]}>
        <Text style={[textStyle]}>{currentMessage}</Text>
      </Animated.View>
    </Block>
  );
};
export const HelperText = memo(HelperTextComponent, equals);
