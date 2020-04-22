import * as React from 'react';
import { InputFlat } from './components/Flat/InputFlat'
import { InputOutline } from './components/OutLine/InputOutline'
import { TextFieldProps } from './TextField.props';


export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const { typeInput } = props
  return typeInput === 'flat' ? <InputFlat {...props} /> : <InputOutline {...props} />
};
