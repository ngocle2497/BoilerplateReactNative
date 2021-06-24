import {StyleSheet} from 'react-native';
import {FontSizeDefault} from '@theme/fontSize';

export const MAX_HEIGHT = 250;

export const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-end',
    bottom: 0,
  },
  buttonDrop: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  row: {
    flexDirection: 'row',
  },
  wrapList: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    maxHeight: MAX_HEIGHT,
  },
  backDrop: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.7)',
    left: 0,
    top: 0,
    opacity: 1,
    bottom: 0,
    right: 0,
  },
  root: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export const stylesItem = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: '100%',
    paddingLeft: 5,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 0,
  },
  textOption: {
    fontSize: FontSizeDefault.FONT_14,
    width: '100%',
    zIndex: 1000,
    fontWeight: 'normal',
  },
});
