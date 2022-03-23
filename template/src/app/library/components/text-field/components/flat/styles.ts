import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    padding: 0,
    marginTop: 10,
    borderBottomColor: 'transparent',
  },
  text: {
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 2,
  },
  wrapLabel: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wrapPlaceHolder: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  flex: {
    flex: 1,
  },
});
