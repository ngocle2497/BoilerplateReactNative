import { Source } from 'react-native-fast-image';
import Animated from 'react-native-reanimated';

export interface GestureHOCProps {
  image: Measure;
  source: Source | number;
  onClose: () => void;
  backDropOpacity: Animated.SharedValue<number>;
}

export type Measure = {
  x: number;
  y: number;
  width: number;
  height: number;
  px: number;
  py: number;
  targetHeight: number;
  targetWidth: number;
  imageOpacity: Animated.SharedValue<number>;
};

export interface ImageTransitionProps {
  image: Measure;
  source: Source | number;
}
