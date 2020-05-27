import * as React from 'react';
import { styles } from './FormRow.presets';
import { FormRowProps } from './FormRow.props';
import { enhance } from '@common'
import equals from 'react-fast-compare'
import { Block } from '../Block/Block';

const FormRowComponent = (props: FormRowProps) => {
  const viewStyle = React.useMemo(() => enhance([styles()[props.preset = 'soloRound'], props.style ?? {}]), [props.style, props.preset]);
  return (
    <Block style={viewStyle}>{props.children}</Block>
  )
}
export const FormRow = React.memo(FormRowComponent, (prevProps, nextProps) => equals(prevProps, nextProps))
