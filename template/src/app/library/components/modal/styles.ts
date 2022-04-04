import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapGesture: {
    paddingVertical: 6,
    alignSelf: 'center',
  },
  anchor: {
    height: 5,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'black',
  },
});
