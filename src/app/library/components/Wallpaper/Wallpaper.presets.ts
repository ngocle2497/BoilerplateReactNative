import {ImageStyle, Dimensions} from 'react-native';

const BASE: ImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export const presets = {
  stretch: ({
    ...BASE,
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  } as unknown) as ImageStyle,
};

export type WallpaperPresets = keyof typeof presets;
