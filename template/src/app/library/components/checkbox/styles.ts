import { createStyleSheet } from 'react-native-unistyles';

export const stylesSheet = createStyleSheet({
  container: (size: number) => ({
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    height: size,
    justifyContent: 'center',
    position: 'relative',
    width: size,
  }),
});
