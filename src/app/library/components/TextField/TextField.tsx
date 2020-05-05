import * as React from 'react';
import { InputFlat } from './components/Flat/InputFlat'
import { InputOutline } from './components/OutLine/InputOutline'
import { TextFieldProps } from './TextField.props';
import { equals } from 'ramda';


const TextFieldComponent: React.FunctionComponent<TextFieldProps> = props => {
  const { typeInput } = props
  return typeInput === 'flat' ? <InputFlat {...props} /> : <InputOutline {...props} />
};
export const TextField = React.memo(TextFieldComponent, (prevProps, nextProps) => equals(prevProps, nextProps))