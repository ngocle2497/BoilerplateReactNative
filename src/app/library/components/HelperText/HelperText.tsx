import React, {useMemo, memo} from 'react';
import {StyleSheet} from 'react-native';
import {HelperTextProps} from './HelperText.prop';
import {Text} from '../Text/Text';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {Block} from '../Block/Block';
import {ColorDefault} from '@theme/color';
import {useTimingTransition, mix, toRad} from '@animated';
import Animated from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',
  },
  textInfo: {
    color: ColorDefault.error,
  },
  textError: {
    color: ColorDefault.info,
  },
  text: {
    fontWeight: 'normal',
  },
});

const HelperTextComponent = (props: HelperTextProps) => {
  const {visible = false, msg, type} = props;
  const progress = useTimingTransition(visible);
  const translateY = mix(progress, -5, 0);
  const translateX = mix(progress, -5, 0);
  const rotateX = toRad(mix(progress, 90, 0));
  const textStyle = useMemo(
    () =>
      enhance([
        styles.text,
        type === 'error' ? styles.textError : styles.textInfo,
      ]),
    [type],
  );

  return (
    <Block style={[styles.container]}>
      <Animated.View
        style={[{transform: [{translateX}, {translateY}, {rotateX}]}]}>
        <Text numberOfLines={1} style={[textStyle]}>
          {msg ?? ''}
        </Text>
      </Animated.View>
    </Block>
  );
};
export const HelperText = memo(HelperTextComponent, equals);
