import {StyleSheet} from 'react-native';
import {FontSizeDefault} from '@theme/fontSize';

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 998,
  },
  wrapOption: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  option: {
    backgroundColor: 'transparent',
    // marginVertical: 5,
  },
  wrapCancel: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
  },
  textCancel: {
    color: 'rgba(255,0,0,0.8)',
  },
  wrapTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    fontSize: FontSizeDefault.FONT_13,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#333333',
  },
});
