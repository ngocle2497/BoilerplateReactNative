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
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  wrapCancel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  textCancel: {
    color: 'rgba(255,0,0,0.8)',
  },
  wrapTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    fontSize: FontSizeDefault.FONT_15,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#333333',
  },
});
