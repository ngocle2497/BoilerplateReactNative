import React, { useMemo } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import { FABDefaultProps } from './type';

import { Icon } from '../../../icon';

export const FABDefault = (props: FABDefaultProps) => {
  // state
  const { onPress, style = {}, icon = 'plus', label } = props;
  const inset = useSafeAreaInsets();

  // style
  const styleBase = useMemo<StyleProp<ViewStyle>>(
    () => [{ right: inset.right + 15, bottom: inset.bottom + 5 }, style],
    [inset, style],
  );

  // render
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.wrap, styleBase]}>
      <Icon icon={icon} />
      {React.isValidElement(label)
        ? label
        : label && <Text style={[styles.label]} children={label as string} />}
    </TouchableOpacity>
  );
};
