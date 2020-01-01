import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
export const isAndroid = Platform.OS === 'android';
export function getTouchableComponent(useNativeFeedback: boolean) {
  if (useNativeFeedback === true && isAndroid === true) {
    return TouchableNativeFeedback;
  }
  return TouchableOpacity;
}

export function TouchableBackground(color: string, fixRadius: boolean) {
  if (isAndroid) {
    if (Platform.Version >= 21) {
      return TouchableNativeFeedback.Ripple(
        color || 'rgba(255,255,255,0.75)',
        fixRadius,
      );
    } else {
      TouchableNativeFeedback.SelectableBackground();
    }
  }
  return undefined;
}
