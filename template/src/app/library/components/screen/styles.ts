import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  insets: {
    position: 'absolute',
  },
});
