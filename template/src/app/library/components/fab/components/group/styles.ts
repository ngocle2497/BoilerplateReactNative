import {StyleSheet} from 'react-native';

import {SIZE_BUTTON_GROUP, SIZE_FAB, SPACE_BETWEEN} from './constants';

export const styles = StyleSheet.create({
  wrap: {
    minWidth: SIZE_FAB,
    height: SIZE_FAB,
    borderRadius: SIZE_FAB / 2,
    backgroundColor: '#fe00f6',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    fontFamily: undefined,
    paddingLeft: 5,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  wrapAction: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
export const stylesButton = StyleSheet.create({
  root: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: SPACE_BETWEEN,
    zIndex: 5,
  },
  wrap: {
    width: SIZE_BUTTON_GROUP,
    height: SIZE_BUTTON_GROUP,
    borderRadius: SIZE_BUTTON_GROUP / 2,
    backgroundColor: '#99aab5',
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapLabel: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
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
    marginRight: 10,
    borderRadius: 5,
  },
  text: {
    fontFamily: undefined,
    fontWeight: 'normal',
  },
});
