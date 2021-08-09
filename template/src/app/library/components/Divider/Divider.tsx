import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';
import React, {memo} from 'react';
import equals from 'react-fast-compare';

import {Block} from '../Block/Block';

import {DividerProps} from './Divider.props';

const DividerComponent = (props: DividerProps) => {
  // state
  const {height = 1, colorTheme, color = '#bbb'} = props;
  const theme: AppTheme = useTheme();
  // render
  return (
    <Block
      width={'100%'}
      height={height}
      color={colorTheme ? theme.colors[colorTheme] : color}
    />
  );
};
export const Divider = memo(DividerComponent, equals);
