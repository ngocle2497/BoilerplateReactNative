import {enhance} from '@common';
import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Icon} from '../../../Icon/Icon';

import {FABDefaultProps} from './FABDefault.props';

const SIZE_FAB = 60;
const styles = StyleSheet.create({
  wrap: {
    minWidth: SIZE_FAB,
    minHeight: SIZE_FAB,
    borderRadius: SIZE_FAB / 2,
    backgroundColor: '#fe00f6',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    fontFamily: undefined,
    paddingLeft: 5,
  },
});

export const FABDefault = (props: FABDefaultProps) => {
  // state
  const {onPress, style = {}, icon = 'plus', label} = props;
  const inset = useSafeAreaInsets();

  // style
  const styleBase = useMemo(
    () =>
      enhance([
        styles.wrap,
        {right: inset.right + 15, bottom: inset.bottom + 5},
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
