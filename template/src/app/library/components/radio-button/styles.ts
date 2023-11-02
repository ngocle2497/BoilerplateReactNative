import { createStyleSheet } from '@theme';

export const stylesSheet = createStyleSheet(theme => ({
  container: (size: number, disabled?: boolean) => ({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: size,
    height: size,
    borderRadius: size,
    borderWidth: 1,
    backgroundColor: theme.color.neutral50,
    borderColor: disabled ? theme.color.neutral200 : theme.color.technical,
  }),
  dot: (size: number, disabled) => {
    return {
      width: size / 2,
      height: size / 2,
      borderRadius: size / 4,
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: disabled
        ? theme.color.neutral200
        : theme.color.primary500,
    };
  },
}));
