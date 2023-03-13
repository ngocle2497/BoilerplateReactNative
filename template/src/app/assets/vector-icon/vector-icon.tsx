import React from 'react';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import { Colors, useTheme } from '@theme';
import { IconProps } from 'react-native-vector-icons/Icon';

import { ICONS } from './icon-name';

const VectorIconBase = createIconSetFromIcoMoon(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./selection.json'),
  'icons',
  'icons.ttf',
);

export type VectorIconIcon = keyof typeof ICONS;

type VectorIconProps = CustomOmit<IconProps, 'name'> & {
  icon: VectorIconIcon;
  colorTheme?: keyof Colors;
};

export const VectorIcon = (props: VectorIconProps) => {
  // state
  const { colors } = useTheme();

  // render
  return (
    <VectorIconBase
      size={24}
      {...props}
      name={ICONS[props.icon]}
      color={props.colorTheme ? colors[props.colorTheme] : props.color}
    />
  );
};
