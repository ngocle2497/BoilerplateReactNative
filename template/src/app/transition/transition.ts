import { TransitionPreset } from '@react-navigation/stack/src/types';
const DURATION_OPEN = 300;
const DURATION_CLOSE = 300;

const scaleBeforeSlideNext: TransitionPreset = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: () => ({}),
  cardStyleInterpolator: ({ current, layouts, next }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95],
              })
            : 1,
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
  transitionSpec: {
    open: { animation: 'timing', config: { duration: DURATION_OPEN } },
    close: { animation: 'timing', config: { duration: DURATION_CLOSE } },
  },
};
const rotateFromRight: TransitionPreset = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: () => ({}),
  cardStyleInterpolator: ({ current, next, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -layouts.screen.width * 1.5],
              })
            : current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width * 1.5, 0],
              }),
        },
        {
          rotate: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '-40deg'],
              })
            : current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['40deg', '0deg'],
              }),
        },
      ],
    },
  }),
  transitionSpec: {
    open: { animation: 'timing', config: {} },
    close: { animation: 'timing', config: {} },
  },
};
const flipBook: TransitionPreset = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: () => ({}),
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        { perspective: 2500 },
        {
          translateX: layouts.screen.width / 2,
        },
        {
          rotateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['-270deg', '-360deg'],
          }),
        },
        {
          translateX: -layouts.screen.width / 2,
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8],
      }),
    },
  }),
  transitionSpec: {
    open: { animation: 'timing', config: { duration: DURATION_OPEN } },
    close: { animation: 'timing', config: { duration: DURATION_CLOSE } },
  },
};

const scaleY: TransitionPreset = {
  gestureDirection: 'vertical',
  headerStyleInterpolator: () => ({}),
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      transform: [
        { perspective: 2500 },
        {
          scaleY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8],
      }),
    },
  }),
  transitionSpec: {
    open: { animation: 'timing', config: { duration: DURATION_OPEN } },
    close: { animation: 'timing', config: { duration: DURATION_CLOSE } },
  },
};
export const TransitionPresets = {
  scaleBeforeSlideNext,
  rotateFromRight,
  flipBook,
  scaleY,
};
