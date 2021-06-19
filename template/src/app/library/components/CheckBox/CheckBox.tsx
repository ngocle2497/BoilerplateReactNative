import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import equals from 'react-fast-compare';
import {SpacingDefault} from '@theme/spacing';
import {ColorDefault} from '@theme/color';
import {enhance, onCheckType} from '@common';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useMix, useSharedTransition} from '@animated';

import {Text} from '../Text/Text';
import {Button} from '../Button/Button';
import {Block} from '../Block/Block';

import {CheckboxProps} from './CheckBox.props';

const DIMENSIONS = {width: 16, height: 16};
const styles = StyleSheet.create({
  ROOT: {
    flexDirection: 'row',
    paddingVertical: SpacingDefault.tiny,
    alignSelf: 'flex-start',
  },
  OUTLINE: {
    ...DIMENSIONS,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.primary,
    borderRadius: 1,
  },
  FILL: {
    width: DIMENSIONS.width - 4,
    height: DIMENSIONS.height - 4,
    backgroundColor: ColorDefault.primary,
  },
  LABEL: {
    paddingLeft: SpacingDefault.smaller,
  },
});

const CheckBoxComponent = ({
  fillStyle,
  onToggle,
  outlineStyle: outlineStyleOverwrite,
  style,
  text,
  tx,
  disable = false,
  initialValue = false,
  value,
}: CheckboxProps) => {
  // state
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue);
  const scale = useMix(progress, 0, 1);
  const opacity = useMix(progress, 0, 1);

  // style
  const rootStyle = useMemo(() => enhance([styles.ROOT, style ?? {}]), [style]);

  const outlineStyle = useMemo(
    () => enhance([styles.OUTLINE, outlineStyleOverwrite ?? {}]),
    [outlineStyleOverwrite],
  );

  const _fillStyle = useMemo(
    () => enhance([styles.FILL, fillStyle ?? {}]),
    [fillStyle],
  );

  const _labelStyle = useMemo(() => styles.LABEL, []);

  // function
  const onPress = useCallback(() => {
    if (typeof value === 'boolean') {
      if (onCheckType(onToggle, 'function')) {
        onToggle && onToggle(!value);
      }
    } else {
      if (onCheckType(onToggle, 'function')) {
        onToggle && onToggle(!localValue);
      }
      setLocalValue(v => !v);
    }
  }, [localValue, onToggle, value]);

  // reanimated style
  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  // render
  return (
    <Button
      activeOpacity={1}
      preset={'link'}
      disabled={disable}
      onPress={onPress}
      style={[rootStyle]}>
      <>
        <Block style={[outlineStyle]}>
          <Animated.View style={[_fillStyle, styleAnimated]} />
        </Block>
        <Text text={text} tx={tx} style={_labelStyle} />
      </>
    </Button>
  );
};
export const CheckBox = React.memo(CheckBoxComponent, equals);
