import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  inner: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  insets: {
    position: 'absolute',
  },
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
});
