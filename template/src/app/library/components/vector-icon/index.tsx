import React from 'react';

import Animated from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import { Colors } from '@theme/index';
import { IconProps } from 'react-native-vector-icons/Icon';

import { ICONS } from './icon-name';

const VectorIconBase = createIconSetFromIcoMoon(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./selection.json'),
  'icons',
  'icons.ttf',
) as any;

export const AnimatedIcon = Animated.createAnimatedComponent(
  VectorIconBase as any,
);

export type VIconName = keyof typeof ICONS;

type VectorIconProps = ReOmit<IconProps, 'name'> & {
  icon: VIconName;
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
