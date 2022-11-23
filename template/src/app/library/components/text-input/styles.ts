import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: '#000',
    padding: 10,
    borderBottomColor: 'transparent',
  },
  containerInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  lineStatus: {
    height: 1,
    width: '10%',
    position: 'absolute',
    bottom: 0,
  },
  multiline: {
    height: 100,
    paddingTop: 10,
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
