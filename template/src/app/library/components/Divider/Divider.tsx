import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import equals from 'react-fast-compare';

import {Block} from '../Block/Block';

import {DividerProps} from './Divider.props';

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
});

const DividerComponent = (props: DividerProps) => {
  const {height = 1, bg = '#bbb'} = props;
  return (
    <Block
      height={height * StyleSheet.hairlineWidth}
      color={bg}
      style={styles.wrap}
    />
  );
};
export const Divider = memo(DividerComponent, equals);
