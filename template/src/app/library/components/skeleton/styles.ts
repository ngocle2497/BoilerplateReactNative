import { StyleSheet } from 'react-native';

import { BASE_ITEM_HEIGHT } from './constants';

export const styles = StyleSheet.create({
  markElement: {
    width: '100%',
    flexDirection: 'row',
    height: '100%',
  },
  linear: {
    width: '100%',
    height: '100%',
  },
  wrapChildren: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    minHeight: BASE_ITEM_HEIGHT,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageOverlay: {
    width: '100%',
    height: 170,
    borderRadius: 4,
    color: 'black',
  },
  avatarOverlay: {
    width: 40,
    height: 40,
    borderRadius: 4,
    color: 'black',
  },
});
