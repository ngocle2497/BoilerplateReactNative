import { StyleSheet } from 'react-native';
export const enhance = (arrStyle: Array<any>) => {
    return StyleSheet.flatten(arrStyle);
};