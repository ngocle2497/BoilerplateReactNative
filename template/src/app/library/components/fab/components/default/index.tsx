import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { enhance } from '@common';

import { styles } from './styles';
import { FABDefaultProps } from './type';

import { Icon } from '../../../icon';

export const FABDefault = (props: FABDefaultProps) => {
  // state
  const { onPress, style = {}, icon = 'plus', label } = props;
  const inset = useSafeAreaInsets();

  // style
  const styleBase = useMemo(
    () =>
      enhance([
        styles.wrap,
        { right: inset.right + 15, bottom: inset.bottom + 5 },
        style,
      ]),
    [inset, style],
  );

  // render
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styleBase]}>
      <Icon icon={icon} />
      {React.isValidElement(label)
        ? label
        : label && <Text style={[styles.label]} children={label as string} />}
    </TouchableOpacity>
  );
};
