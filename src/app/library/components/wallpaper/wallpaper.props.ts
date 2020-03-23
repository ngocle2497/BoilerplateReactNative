import { ImageStyle } from 'react-native';
import { WallpaperPresets } from './wallpaper.presets';

export interface WallpaperProps {

  style?: ImageStyle;


  backgroundImage?: string;

  preset?: WallpaperPresets;

  dependency?: any[];
}
