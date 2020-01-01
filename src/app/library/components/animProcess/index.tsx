import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
const {width} = Dimensions.get('window');
export interface AnimProcessProps {
  color: string;
}
const percentWidth = 0.87;
export const AnimProcess = (props: AnimProcessProps) => {
  const {color} = props;
  const widthAnim1 = useRef(new Animated.Value(width * percentWidth)).current;
  const translateX1 = useRef(new Animated.Value(-width * percentWidth)).current;
  const onRunAnim1 = () => {
    Animated.timing(translateX1, {
      toValue: width,
      duration: 1000,
    }).start(() => {
      translateX1.setValue(-width * percentWidth);
      onRunAnim1();
    });
  };
  const onRunAnim2 = () => {
    Animated.parallel([
      Animated.timing(widthAnim1, {
        toValue: width / 6,
        duration: 1000,
      }),
      Animated.timing(translateX1, {
        toValue: width,
        duration: 1000,
      }),
    ]).start(() => {
      widthAnim1.setValue(width * percentWidth);
      translateX1.setValue(-width * percentWidth);
      onRunAnim2();
    });
  };
  useEffect(() => {
    onRunAnim2();
  }, []);
  return (
    <View style={[styles.position]}>
      <View style={[styles.wrap]}>
        <Animated.View
          style={[
            styles.wrapAnim1,
            {
              width: widthAnim1,
              transform: [{translateX: translateX1}],
              backgroundColor: color ? color : '#fdfdfd',
            },
          ]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    zIndex: 999,
  },
  wrap: {
    height: 3,
    width: width,
    backgroundColor: 'transparent',
  },
  wrapAnim1: {
    height: '100%',
  },
});
