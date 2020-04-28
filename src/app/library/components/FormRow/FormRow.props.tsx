import * as React from 'react';
import {ViewStyle} from 'react-native';
import {FormRowPresets} from './FormRow.presets';

export interface FormRowProps {

  children?: React.ReactNode;

  style?: ViewStyle | ViewStyle[];

  preset: FormRowPresets;

}
