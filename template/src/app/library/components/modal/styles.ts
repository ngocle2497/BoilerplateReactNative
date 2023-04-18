import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
