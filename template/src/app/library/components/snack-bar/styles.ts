import { StyleSheet } from 'react-native';

import { sizeScale } from '@common/scale';

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  itemBar: {
    // alignSelf: 'center',
    alignItems: 'center',

    flexDirection: 'row',

    paddingHorizontal: sizeScale(15),

    paddingVertical: sizeScale(13),

    position: 'absolute',
    width: '100%',
  },
  text: {
    flex: 1,
    marginTop: sizeScale(-2),
  },
});
