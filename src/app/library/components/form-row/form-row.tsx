import * as React from 'react';
import { View } from 'react-native';
import { styles } from './form-row.presets';
import { FormRowProps } from './form-row.props';
import { mergeAll, flatten } from 'ramda';

export const FormRow = (props: FormRowProps) => {
  const viewStyle = mergeAll(flatten([styles()[props.preset = 'soloRound'], props.style]));
  const dependencyList = [viewStyle, ...props.dependency = []]
  return React.useMemo(() =>
    <View style={viewStyle}>{props.children}</View>, dependencyList)
}
