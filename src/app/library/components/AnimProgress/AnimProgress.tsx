import React, { forwardRef, useImperativeHandle, useState, memo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { useCode, set, interpolate } from 'react-native-reanimated'
import { useValues, loop, } from 'react-native-redash'
import { useSafeArea } from 'react-native-safe-area-view';
import { Block } from '../Block/Block';
import { equals } from 'ramda';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  wrap: {
    height: 3,
    width: width,
    backgroundColor: 'transparent',
  },
  wrapAnim: {
    height: '100%',
    position: 'absolute'
  },
});

export interface AnimProcessProps {
  color?: string;
  backgroundColor?: string;
  underStatusbar?: boolean;
}
const AnimProcessComponent = forwardRef((props: AnimProcessProps, ref) => {
  const [visible, setVisible] = useState(false)
  const inset = useSafeArea()
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    }
  }))
  const { color, backgroundColor = "transparent", underStatusbar = false } = props;
  const [widthPercent, widthPercent2] = useValues([0, 0], [])
  const widthAb = interpolate(widthPercent, {
    inputRange: [0, 1],
    outputRange: [width * 0.75, width * 0.05]
  })
  const translateX = interpolate(widthPercent, {
    inputRange: [0, 1],
    outputRange: [- width * 0.75, width * 1.5]
  })

  useCode(() => visible ? [set(widthPercent, loop({ duration: 1000 })),] : [set(widthPercent, 0),]
    , [visible])
  return (
    <Block color={backgroundColor} style={[styles.position, { top: underStatusbar ? inset.top : 0 }]}>
      <Block style={[styles.wrap]}>
        <Animated.View
          style={[
            styles.wrapAnim,
            { width: widthAb, transform: [{ translateX }], backgroundColor: color ?? '#FFFFFF' },
          ]}
        />
      </Block>
    </Block>
  )
})
export const AnimProcess = memo(AnimProcessComponent, (prevProps, nextProps) => equals(prevProps, nextProps))