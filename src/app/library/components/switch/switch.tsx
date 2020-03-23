import * as React from 'react';
import {
  ViewStyle,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { SwitchProps } from './switch.props';
import { mergeAll, flatten } from 'ramda';
import { timing, useValues, interpolateColor, onGestureEvent } from 'react-native-redash'
import Animated, { set, Easing, interpolate } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { AppTheme } from '../../../config/type';
import { useTheme } from '@react-navigation/native';
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


const enhance = (style: any, newStyles: any): any => {
  return mergeAll(flatten([style, newStyles]));
};
export const Switch = (props: SwitchProps) => {
  const [timer] = useValues([props.value === true ? 1 : 0], [])
  const theme: AppTheme = useTheme()
  useCode(() => [
    set(timer, timing({ from: timer, to: props.value === true ? 1 : 0, easing: Easing.out(Easing.circle), duration: DURATION }))
  ], [props.value])

  const [previousValue, setPreviousValue] = React.useState<boolean>(
    props.value,
  );
  React.useEffect(() => {
    if (props.value !== previousValue) {
      setPreviousValue(props.value);
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
  const style = enhance({}, props.style);

  let trackStyle = styles.TRACK;
  trackStyle = enhance(trackStyle, {
    backgroundColor: bgTrackColor,
    borderColor: borderColor,
  });
  trackStyle = enhance(
    trackStyle,
    props.value ? props.trackOnStyle : props.trackOffStyle,
  );

  let thumbStyle = styles.THUMB;
  thumbStyle = enhance(thumbStyle, {
    transform: [{ translateX }],
  });
  thumbStyle = enhance(
    thumbStyle,
    props.value ? props.thumbOnStyle : props.thumbOffStyle,
  );
  const dependencyList = [props.value, theme, props.thumbOffStyle, props.thumbOnStyle, props.trackOnStyle, props.trackOffStyle, ...props.dependency = []]
  return React.useMemo(() => (
    <TouchableWithoutFeedback onPress={handlePress} style={style}>
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  ), dependencyList)
};
