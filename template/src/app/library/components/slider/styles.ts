import { StyleSheet } from 'react-native';

import {
  ACTIVE_COLOR,
  HEIGHT_SLIDER,
  IN_ACTIVE_COLOR,
  THUMB_SIZE,
} from './constants';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
  },
  container: {
    height: HEIGHT_SLIDER,
    backgroundColor: IN_ACTIVE_COLOR,
    width: '100%',
    flex: 1,
  },
  thumb: {
    position: 'absolute',
    top: -THUMB_SIZE + HEIGHT_SLIDER / 2,
    left: 0,
    width: THUMB_SIZE * 2,
    height: THUMB_SIZE * 2,
    borderRadius: THUMB_SIZE,
    backgroundColor: ACTIVE_COLOR,
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ACTIVE_COLOR,
  },
  wrapValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THUMB_SIZE / 2,
  },
});
export const stylesRange = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
  },
  wrapTrack: {
    overflow: 'hidden',
    flex: 1,
  },
  container: {
    height: HEIGHT_SLIDER,
    backgroundColor: IN_ACTIVE_COLOR,
    width: '100%',
    flex: 1,
  },
  thumb: {
    position: 'absolute',
    top: -THUMB_SIZE + HEIGHT_SLIDER / 2,
    left: 0,
    width: THUMB_SIZE * 2,
    height: THUMB_SIZE * 2,
    borderRadius: THUMB_SIZE,
    backgroundColor: ACTIVE_COLOR,
  },
  track: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: ACTIVE_COLOR,
  },
  wrapValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THUMB_SIZE / 2,
  },
});
