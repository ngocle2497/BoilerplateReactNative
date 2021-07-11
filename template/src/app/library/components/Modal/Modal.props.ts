import {ReactElement} from 'react';
import {ViewStyle} from 'react-native';

import {TypeIn, TypeOut} from './untils';
export interface ModalProps {
  children?: ReactElement;
  isVisible: boolean;
  backdropOpacity?: number;
  backdropColor?: string;
  customBackDrop?: ReactElement;
  backdropInDuration?: number;
  backdropOutDuration?: number;
  animatedInDuration?: number;
  animatedOutDuration?: number;
  animatedIn?: TypeIn;
  animatedOut?: TypeOut;
  style?: ViewStyle | ViewStyle[];
  onModalWillHide?: () => void;
  onModalHide?: () => void;
  onModalWillShow?: () => void;
  onModalShow?: () => void;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
}
