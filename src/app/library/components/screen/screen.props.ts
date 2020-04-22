import { ViewStyle } from 'react-native';
import {ForceInsetProp} from 'react-native-safe-area-view';
export interface ScreenProps {
  children?: React.ReactNode;

  style?: ViewStyle;

  backgroundColor?: string;

  statusBar?: 'light-content' | 'dark-content';

  unsafe?: boolean;


  hidden?: boolean;

  statusColor?: string;

  draw?: boolean;

  customInsetBottom?: boolean;

  bottomIPX?: string;

  outer0?: ViewStyle;

  showVertical?: boolean;

  showHorizontal?: boolean;

  isScroll?: boolean;

  forceInset?: ForceInsetProp;

  dismissKeyboard?:boolean;
}
