import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import equals from 'react-fast-compare';
import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';

import {Block} from '../Block/Block';

import {DividerProps} from './Divider.props';

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
});

const DividerComponent = (props: DividerProps) => {
  // state
  const {height = 1, colorTheme, color = '#bbb'} = props;
  const theme: AppTheme = useTheme();
  // render
  return (
    <Block
      height={height * StyleSheet.hairlineWidth}
      color={colorTheme ? theme.colors[colorTheme] : color}
      style={styles.wrap}
    />
  );
};
export const Divider = memo(DividerComponent, equals);
