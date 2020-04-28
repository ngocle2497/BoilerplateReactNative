import * as React from 'react';
import { styles } from './FormRow.presets';
import { FormRowProps } from './FormRow.props';
import { mergeAll, flatten, equals } from 'ramda';
import { Block } from '../Block/Block';

const FormRowComponent = (props: FormRowProps) => {
  const viewStyle = mergeAll(flatten([styles()[props.preset = 'soloRound'], props.style ?? {}]));
  return (
    <Block style={viewStyle}>{props.children}</Block>
  )
}
export const FormRow = React.memo(FormRowComponent, (prevProps, nextProps) => equals(prevProps, nextProps))
