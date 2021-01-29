import React, {memo, useMemo, useCallback} from "react";
import {TouchableWithoutFeedback, Animated} from "react-native";
import equals from "react-fast-compare";

import {TouchableScaleProps} from "./Touch.props";

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

  const runAnimated = useCallback(
    (value: number) => {
      Animated.timing(scale, {
        toValue: value,
        duration: 150,
        useNativeDriver: true,
      }).start();
    },
    [scale],
  );

  const _onPressIn = useCallback(() => {
    runAnimated(minScale);
    onPressIn && onPressIn();
  }, [minScale, onPressIn, runAnimated]);

  const _onLongPress = useCallback(() => {
    if (typeof onLongPress === "function") {
      runAnimated(1);
      onLongPress();
    }
  }, [onLongPress, runAnimated]);

  const _onPressOut = useCallback(() => {
    runAnimated(1);
    onPressOut && onPressOut();
  }, [onPressOut, runAnimated]);

  const _onPress = useCallback(() => {
    runAnimated(1);
    onPress && onPress();
  }, [onPress, runAnimated]);

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
export const TouchableScale = memo(TouchableScaleComponent, equals);
