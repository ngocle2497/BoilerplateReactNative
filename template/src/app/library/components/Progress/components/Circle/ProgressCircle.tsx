import {enhance} from '@common';
import React, {memo, useCallback, useMemo} from 'react';
import equals from 'react-fast-compare';
import {StyleSheet, Text, View} from 'react-native';

import {Circular} from './Circular';
import {ProgressCircleProps} from './ProgressCircle.props';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textProgress: {
    position: 'absolute',
    zIndex: 3,
    alignSelf: 'center',
  },
});

export const ProgressCircleComponent = (props: ProgressCircleProps) => {
  const {
    bg,
    fg,
    radius,
    progress,
    strokeWidth,
    showTextProgress,
    textProgressStyle,
  } = props;
  // style
  const textStyles = useMemo(
    () => enhance([styles.textProgress, textProgressStyle]),
    [textProgressStyle],
  );

  // function
  const renderText = useCallback(() => {
    if (progress < 0) {
      return 0 + '';
    }
    if (progress > 100) {
      return 100 + '';
    }
    return progress + '';
  }, [progress]);

  // render
  return (
    <View style={styles.container}>
      {showTextProgress && (
        <Text style={[textStyles]} children={renderText()} />
      )}
      <View>
        <Circular
          strokeWidth={strokeWidth}
          bg={bg}
          fg={fg}
          radius={radius}
          progress={progress}
        />
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            width: radius * 2 - strokeWidth,
            height: radius * 2 - strokeWidth,
            borderRadius: radius + strokeWidth / 2,
            backgroundColor: bg,
          }}
        />
      </View>
    </View>
  );
};
export const ProgressCircle = memo(ProgressCircleComponent, equals);
