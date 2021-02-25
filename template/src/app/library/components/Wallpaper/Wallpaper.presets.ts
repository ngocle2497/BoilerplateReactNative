import {ImageStyle} from 'react-native';

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
  } as unknown) as ImageStyle,
};

export type WallpaperPresets = keyof typeof presets;
