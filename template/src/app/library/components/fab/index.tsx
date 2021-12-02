import React, {memo} from 'react';
import equals from 'react-fast-compare';

import {FABDefault} from './components/default';
import {FABGroup} from './components/group';
import {FABProps} from './type';

const FABComponent = (props: FABProps) => {
  const {type = 'default', icon = 'plus', style = {}} = props;

  // render
  return type === 'default' ? (
    <FABDefault {...{...props, icon, style}} />
  ) : (
    <FABGroup {...{...props, icon, style}} />
  );
};
export const FAB = memo(FABComponent, equals);
