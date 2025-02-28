import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  itemBar: {
    // alignSelf: 'center',
    alignItems: 'center',

    flexDirection: 'row',

    paddingHorizontal: 15,

    paddingVertical: 13,

    position: 'absolute',
    width: '100%',
  },
  text: {
    flex: 1,
    marginTop: -2,
  },
});
