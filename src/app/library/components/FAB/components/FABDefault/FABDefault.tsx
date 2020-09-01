import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {FABDefaultProps} from './FABDefault.props';
import {Button} from '../../../Button/Button';
import {Text} from '../../../Text/Text';
import {Icon} from '../../../Icon/Icon';

import {useSafeArea} from 'react-native-safe-area-context';
import {enhance} from '@common';

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
  const {onPress, style = {}, icon, label} = props;
  const inset = useSafeArea();
  const styleBase = useMemo(
    () =>
      enhance([
        styles.wrap,
        {right: inset.right + 15, bottom: inset.bottom + 5},
        style,
      ]),
    [inset, style],
  );
  return (
    <Button
      onPress={onPress}
      activeOpacity={0.6}
      preset={'link'}
      style={[styleBase]}>
      <Icon icon={icon} />
      {React.isValidElement(label)
        ? label
        : label && <Text style={[styles.label]} text={label as string} />}
    </Button>
  );
};
