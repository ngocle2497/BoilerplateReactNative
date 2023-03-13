import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;

const guidelineBaseHeight = 680;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
