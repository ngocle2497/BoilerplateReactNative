import { ViewStyle } from 'react-native';

export interface SwitchProps {

  value?: boolean;

  onToggle?: (newValue: boolean) => void;

  style?: ViewStyle | ViewStyle[];

  trackOnStyle?: ViewStyle | ViewStyle[];


  trackOffStyle?: ViewStyle | ViewStyle[];

  thumbOnStyle?: ViewStyle | ViewStyle[];

  thumbOffStyle?: ViewStyle | ViewStyle[];

}
