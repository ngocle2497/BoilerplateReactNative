import {ViewStyle} from 'react-native';

export interface CheckboxProps {

  style?: ViewStyle | ViewStyle[];

  outlineStyle?: ViewStyle | ViewStyle[];

  fillStyle?: ViewStyle | ViewStyle[];

  value?: boolean;

  text?: string;

  tx?: string;

  multiline?: boolean;

  onToggle?: (newValue: boolean) => void;

  dependency?:any[];
}
