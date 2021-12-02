import {sizeScale} from '@common';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 15,
  },
  textMode: {
    flex: 1,
    fontSize: sizeScale(12),
  },
  title: {
    fontSize: sizeScale(13),
    paddingVertical: 0,
    alignSelf: 'center',
  },
  textAppMode: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
  },
  wrapMode: {
    position: 'absolute',
    right: -20,
    top: 0,
    zIndex: 999,
    width: 150,
    backgroundColor: '#bc9372',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    transform: [{rotate: '45deg'}, {translateX: 30}],
  },
});
