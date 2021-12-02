import {sizeScale} from '@common';
import {StyleSheet} from 'react-native';

export const MAX_HEIGHT = 250;

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginVertical: 0,
  },
  root: {
    flex: 1,
    alignItems: 'center',
  },
  rowButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  content: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    maxHeight: 250,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontWeight: 'normal',
    fontSize: sizeScale(14),
  },
});
