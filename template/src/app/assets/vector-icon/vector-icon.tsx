import React from 'react';

import Animated from 'react-native-reanimated';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import { Colors, useStyles } from '@theme';
import { IconProps } from 'react-native-vector-icons/Icon';

import { ICONS } from './icon-name';

const VectorIconBase = createIconSetFromIcoMoon(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./selection.json'),
  'icons',
  'icons.ttf',
);

export const AnimatedIcon = Animated.createAnimatedComponent(VectorIconBase);

export type VectorIconIcon = keyof typeof ICONS;

type VectorIconProps = ReOmit<IconProps, 'name'> & {
  icon: VectorIconIcon;
  colorTheme?: Colors;
};

export const VectorIcon = (props: VectorIconProps) => {
  // state
  const {
    theme: { color },
  } = useStyles();

  // render
  return (
    <VectorIconBase
      size={24}
      {...props}
      name={ICONS[props.icon]}
      color={
        props.colorTheme && typeof color[props.colorTheme] === 'string'
          ? (color[props.colorTheme] as string)
          : props.color
      }
    />
  );
};
