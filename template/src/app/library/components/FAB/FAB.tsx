import React, {memo} from 'react';
import equals from 'react-fast-compare';

import {FABDefault} from './components/FABDefault/FABDefault';
import {FABGroup} from './components/FABGroup/FABGroup';
import {FABProps} from './FAB.props';

const FABComponent = (props: FABProps) => {
  const {type = 'default', icon = 'plus', style = {}} = props;
  return type === 'default' ? (
    <FABDefault {...{...props, icon, style}} />
  ) : (
    <FABGroup {...{...props, icon, style}} />
  );
};
export const FAB = memo(FABComponent, equals);
