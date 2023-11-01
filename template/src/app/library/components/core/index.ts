import Animated from 'react-native-reanimated';

import { Text } from './Text';
import { View } from './View';

export const AnimatedText = Animated.createAnimatedComponent(Text);

export const AnimatedView = Animated.createAnimatedComponent(View);

export { Text, View };
