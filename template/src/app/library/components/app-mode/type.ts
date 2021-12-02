import {IconTypes} from '@assets/icon';
import {AppModeType} from '@library/networking';

export interface ButtonSelectProps {
  tx: string;
  mode: AppModeType;
  onPress?: (mode: AppModeType) => void;
  icon: IconTypes;
  selected: boolean;
}
export interface AppModeProps {
  appMode: AppModeType;
}
