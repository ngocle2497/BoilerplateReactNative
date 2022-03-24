import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { InjectorProps } from './types';

const InjectorComponent = ({
  defaultComponent: DefaultComponent,
  children,
  defaultProps,
  injectant: Injectant,
  injectantProps,
}: InjectorProps) => {
  // render
  return Injectant ? (
    <Injectant {...defaultProps} {...injectantProps}>
      {children}
    </Injectant>
  ) : (
    <DefaultComponent {...defaultProps}>{children}</DefaultComponent>
  );
};

export const Injector = memo(InjectorComponent, isEqual);
