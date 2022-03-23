import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  hiddenView: {
    position: 'absolute',
    zIndex: -999,
    opacity: 0,
  },
  header: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
