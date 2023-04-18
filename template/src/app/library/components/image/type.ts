import { ImageProps as ExpoImageProps } from 'expo-image';

export type ImageProps = Omit<ExpoImageProps, 'style'>;
