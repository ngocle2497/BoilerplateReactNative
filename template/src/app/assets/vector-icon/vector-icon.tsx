import React, { memo, MemoExoticComponent, NamedExoticComponent } from 'react';

import isEqual from 'react-fast-compare';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import { CustomOmit } from '@common';
import { Colors, useTheme } from '@theme';
import { IconProps } from 'react-native-vector-icons/Icon';

import { ICONS } from './icon-name';

const VectorIconBase = createIconSetFromIcoMoon(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./selection.json'),
  'icons',
  'icons.ttf',
);

const Icon = memo(VectorIconBase, isEqual);
export type VectorIconIcon = keyof typeof ICONS;

type VectorIconProps = CustomOmit<IconProps, 'name'> & {
  icon: VectorIconIcon;
  colorTheme?: keyof Colors;
};

export const VectorIcon = memo((props: VectorIconProps) => {
  // state
  const { colors } = useTheme();
  // render
  return (
    <Icon
      size={24}
      {...props}
      name={ICONS[props.icon]}
      color={
        props.colorTheme ? (colors[props.colorTheme] as string) : props.color
      }
    />
  );
}, isEqual) as MemoExoticComponent<NamedExoticComponent<VectorIconProps>> & {
  icons: typeof ICONS;
};
