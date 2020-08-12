import {StyleSheet} from 'react-native';
export const enhance = (arrStyle: Array<any>) => {
  return StyleSheet.flatten(arrStyle);
};

export const checkKeyInObject = (T: any, key: string) => {
  return Object.keys(T).includes(key);
};
