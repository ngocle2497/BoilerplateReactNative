import React, { useMemo, memo } from 'react';
import { Circular } from './Circular';
import { StyleSheet } from 'react-native';
import { ProgressCircleProps } from './ProgressCircle.props';
import { Text } from '../../../Text/Text';
import { enhance } from '@common';
import equals from 'react-fast-compare';
import { Block } from '../../../Block/Block';
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  const textStyles = useMemo(
    () => enhance([styles.textProgress, textProgressStyle]),
    [],
  );
  const renderText = (): string => {
    if (progress < 0) {
      return 0 + '';
    }
    if (progress > 100) {
      return 100 + '';
    }
    return progress + '';
  };
  return (
    <Block style={styles.container}>
      {showTextProgress && <Text style={[textStyles]} text={renderText()} />}
      <Block>
        <Circular bg={bg} fg={fg} radius={radius} progress={progress} />
      </Block>
      <Block style={styles.overlay}>
        <Block
          style={{
            width: radius * 2 - strokeWidth,
            height: radius * 2 - strokeWidth,
            borderRadius: radius - strokeWidth / 2,
            backgroundColor: bg,
          }}
        />
      </Block>
    </Block>
  );
};
export const ProgressCircle = memo(
  ProgressCircleComponent, equals
);
