import {StyleSheet} from 'react-native';
export const enhance = <T>(arrStyle: Array<T>) => {
  return StyleSheet.flatten<T>(arrStyle);
};

export const checkKeyInObject = (T: any, key: string) => {
  return Object.keys(T).includes(key);
};
