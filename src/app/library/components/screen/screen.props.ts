import { ViewStyle } from 'react-native';
import { KeyboardOffsets, ScreenPresets } from './screen.presets';
import {ForceInsetProp} from 'react-native-safe-area-view';
export interface ScreenProps {
  children?: React.ReactNode;

  style?: ViewStyle;

  preset?: ScreenPresets;

  backgroundColor?: string;

  statusBar?: 'light-content' | 'dark-content';

  unsafe?: boolean;

  keyboardOffset?: KeyboardOffsets;

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
