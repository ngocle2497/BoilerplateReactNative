import { createStyleSheet } from 'react-native-unistyles';

export const stylesSheet = createStyleSheet({
  container: (size: number) => ({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: size,
    height: size,
    borderRadius: 4,
    borderWidth: 1,
  }),
});
