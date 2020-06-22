import React, {memo, useMemo, useCallback} from 'react';
import {TouchableWithoutFeedback, Animated} from 'react-native';
import {TouchableScaleProps} from './Touch.props';
import equals from 'react-fast-compare';

const TouchableScaleComponent = (props: TouchableScaleProps) => {
  const {
    children,
    minScale = 0.9,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
  } = props;
  const scale = useMemo(() => new Animated.Value(1), []);
  const runAnimated = useCallback((value: number) => {
    Animated.timing(scale, {
      toValue: value,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, []);
  const _onPressIn = useCallback(() => {
    runAnimated(minScale);
    onPressIn && onPressIn();
  }, [onPressIn]);
  const _onLongPress = useCallback(() => {
    if (typeof onLongPress === 'function') {
      runAnimated(1);
      onLongPress();
    }
  }, [onLongPress]);
  const _onPressOut = useCallback(() => {
    runAnimated(1);
    onPressOut && onPressOut();
  }, [onPressOut]);
  const _onPress = useCallback(() => {
    runAnimated(1);
    onPress && onPress();
  }, [onPress]);
  return (
    <TouchableWithoutFeedback
      onLongPress={_onLongPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onPress={_onPress}>
      <Animated.View style={[{transform: [{scale}]}]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};
export const TouchableScale = memo(
  TouchableScaleComponent,
  (prevProps, nextProps) => equals(prevProps, nextProps),
);
