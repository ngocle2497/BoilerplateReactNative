import * as React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SwitchProps } from './Switch.props';
import { enhance } from '@common'
import equals from 'react-fast-compare'
import { timing, useValues, interpolateColor } from 'react-native-redash'
import Animated, { set, Easing, interpolate } from 'react-native-reanimated'
const { useCode } = Animated;
// dimensions
const THUMB_SIZE = 30;
const WIDTH = 56;
const MARGIN = 2;
const OFF_POSITION = -0.5;
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN;
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4;

// colors
const ON_COLOR = '#008000';
const OFF_COLOR = '#e6e6e6';
const BORDER_ON_COLOR = ON_COLOR;
const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.1)';

// animation
const DURATION = 250;

const styles = StyleSheet.create({
  TRACK: {
    height: THUMB_SIZE + MARGIN,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    borderWidth: MARGIN / 2,
  },
  THUMB: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: MARGIN / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: BORDER_OFF_COLOR,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  }

})



const SwitchComponent = (props: SwitchProps) => {
  const [timer] = useValues([props.value === true ? 1 : 0], [])
  useCode(() => [
    set(timer, timing({ from: timer, to: props.value === true ? 1 : 0, easing: Easing.out(Easing.circle), duration: DURATION }))
  ], [props.value])

  const [previousValue, setPreviousValue] = React.useState<boolean>(
    props.value ?? false,
  );
  React.useEffect(() => {
    if (props.value !== previousValue) {
      setPreviousValue(props.value ?? false);
    }
  }, [props.value]);

  const handlePress = React.useMemo(
    () => () => props.onToggle && props.onToggle(!props.value),
    [props.onToggle, props.value],
  );
  const translateX = interpolate(timer, {
    inputRange: [0, 1],
    outputRange: [OFF_POSITION, ON_POSITION],
  });
  const bgTrackColor = interpolateColor(timer, {
    inputRange: [0, 1],
    outputRange: [OFF_COLOR, ON_COLOR]
  })
  const borderColor = interpolateColor(timer, {
    inputRange: [0, 1],
    outputRange: [BORDER_OFF_COLOR, BORDER_ON_COLOR]
  })
  const style = enhance([{}, props.style]);

  const trackStyle = [styles.TRACK, {
    backgroundColor: bgTrackColor,
    borderColor: borderColor,

  }, props.value ? props.trackOnStyle : props.trackOffStyle] as StyleProp<Animated.AnimateStyle<ViewStyle>>;

  const thumbStyle = [styles.THUMB, {
    transform: [{ translateX }],
  }, props.value ? props.thumbOnStyle : props.thumbOffStyle] as StyleProp<Animated.AnimateStyle<ViewStyle>>;

  return (
    <TouchableWithoutFeedback onPress={handlePress} style={style}>
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
};
export const Switch = React.memo(SwitchComponent, (prevProps, nextProps) => equals(prevProps, nextProps))