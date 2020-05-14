import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {equals} from 'ramda';
import Svg, {Ellipse, Circle, G} from 'react-native-svg';
import {useValue, useValues, loop} from 'react-native-redash';
import Animated, {useCode, set, interpolate} from 'react-native-reanimated';
const SIZE_LOADING = 100;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedGroup = Animated.createAnimatedComponent(G);

const styles = StyleSheet.create({
  wrap: {
    width: SIZE_LOADING,
    height: SIZE_LOADING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrapValue: {
    width: SIZE_LOADING / 4,
    height: SIZE_LOADING / 4,
    borderRadius: SIZE_LOADING / 8,
    backgroundColor: 'cyan',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white',
  },
  svg:{
      position:'absolute'
  }
});

export const LoadingDemoComponent = () => {
  const [progress] = useValues([0], []);
  useCode(() => set(progress, loop({duration: 1500})), []);
  const rotate1 = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 2 * Math.PI],
  });
  const rotate2 = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [Math.PI, 0],
  });
  return (
    <View style={[styles.wrap]}>
      <AnimatedSvg style={[styles.svg,{transform:[{rotate:rotate1}]}]} width={SIZE_LOADING} height={SIZE_LOADING}>
        {/* <Ellipse
            stroke={'cyan'}
            strokeWidth={3}
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            rx="25"
            ry="45"
          />
          <Ellipse
            stroke={'cyan'}
            strokeWidth={3}
            transform="rotate(-60, 50, 50)"
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            rx="25"
            ry="45"
          />
          <Ellipse
            transform="rotate(60, 50, 50)"
            stroke={'cyan'}
            strokeWidth={3}
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            rx="25"
            ry="45"
          /> */}
        <G>
          <Circle
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            r={SIZE_LOADING / 2 - 4}
            fill="transparent"
            strokeWidth={3}
            stroke={'cyan'}
            strokeDasharray={(Math.PI * 2 * (SIZE_LOADING / 2 - 4)) / 4}
          />
          <Circle
            transform={'rotate(90, 50, 50)'}
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            r={SIZE_LOADING / 2 - 4}
            fill="transparent"
            strokeWidth={3}
            stroke={'red'}
            strokeDasharray={(Math.PI * 2 * (SIZE_LOADING / 2 - 4)) / 4}
          />
        </G>

      </AnimatedSvg>
      <AnimatedSvg style={[styles.svg,{transform:[{rotate:rotate2}]}]} width={SIZE_LOADING} height={SIZE_LOADING}>
        <G>
          <Circle
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            r={SIZE_LOADING / 4 - 4}
            fill="transparent"
            strokeWidth={3}
            stroke={'cyan'}
            strokeDasharray={(Math.PI * 2 * (SIZE_LOADING / 4 - 4)) / 4}
          />
          <Circle
            transform={'rotate(90, 50, 50)'}
            cx={SIZE_LOADING / 2}
            cy={SIZE_LOADING / 2}
            r={SIZE_LOADING / 4 - 4}
            fill="transparent"
            strokeWidth={3}
            stroke={'red'}
            strokeDasharray={(Math.PI * 2 * (SIZE_LOADING / 4 - 4)) / 4}
          />
        </G>
      </AnimatedSvg>
      <View style={styles.wrapValue}>
        <Text style={[styles.text]}>50</Text>
      </View>
    </View>
  );
};

// export default memo(LoadingDemoComponent, (prevProps, nextProps) =>
//   equals(prevProps, nextProps),
// );
