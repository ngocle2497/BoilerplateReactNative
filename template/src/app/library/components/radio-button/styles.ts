import { createStyleSheet } from 'react-native-unistyles';

export const stylesSheet = createStyleSheet(theme => ({
  container: (size: number, disabled?: boolean) => ({
    alignItems: 'center',
    backgroundColor: theme.color.neutral50,
    borderColor: disabled ? theme.color.neutral200 : theme.color.technical,
    borderRadius: size,
    borderWidth: 1,
    height: size,
    justifyContent: 'center',
    position: 'relative',
    width: size,
  }),
  dot: (size: number, disabled) => {
    return {
      alignSelf: 'center',
      backgroundColor: disabled
        ? theme.color.neutral200
        : theme.color.primary500,
      borderRadius: size / 4,
      height: size / 2,
      position: 'absolute',
      width: size / 2,
    };
  },
}));
