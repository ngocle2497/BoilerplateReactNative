import * as React from 'react';
import { styles } from './FormRow.presets';
import { FormRowProps } from './FormRow.props';
import { mergeAll, flatten } from 'ramda';
import { Block } from '../Block/Block';

export const FormRow = (props: FormRowProps) => {
  const viewStyle = mergeAll(flatten([styles()[props.preset = 'soloRound'], props.style ?? {}]));
  const dependencyList = [viewStyle, ...props.dependency = []]
  return React.useMemo(() =>
    <Block style={viewStyle}>{props.children}</Block>, dependencyList)
}
