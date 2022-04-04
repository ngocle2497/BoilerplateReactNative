import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';

export const styles = StyleSheet.create({
  labelStyle: {
    flex: 1,
    paddingRight: sizeScale(5),
  },
  container: {
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapIcon: {
    minHeight: sizeScale(24),
  },
  placeHolder: {
    flex: 1,
    paddingRight: sizeScale(5),
  },
  wrapView: {
    backgroundColor: '#FFFFFF',
    borderRadius: sizeScale(3),
    flex: 1,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  wrapViewBottomOpened: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: '#bbb',
  },
  wrapViewTopOpened: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: '#bbb',
  },
  dropStyle: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    overflow: 'hidden',
    // minHeight: 50,
    maxHeight: sizeScale(250),
    paddingHorizontal: sizeScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropTopOpened: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  dropBottomOpened: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  wrapPlaceholder: {
    paddingHorizontal: sizeScale(10),
    paddingVertical: sizeScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  modal: {
    justifyContent: undefined,
  },
});
