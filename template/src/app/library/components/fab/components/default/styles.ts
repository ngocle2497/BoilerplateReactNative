import {StyleSheet} from 'react-native';
const SIZE_FAB = 60;
export const styles = StyleSheet.create({
  wrap: {
    minWidth: SIZE_FAB,
    minHeight: SIZE_FAB,
    borderRadius: SIZE_FAB / 2,
    backgroundColor: '#fe00f6',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
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
});
