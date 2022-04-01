import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  itemBar: {
    paddingHorizontal: sizeScale(15),
    paddingVertical: sizeScale(13),
    position: 'absolute',
    width: '100%',
    // alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginTop: sizeScale(-2),
    flex: 1,
  },
});
