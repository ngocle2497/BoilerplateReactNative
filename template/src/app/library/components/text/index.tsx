import React, { useMemo } from 'react';
import {
  Text as ReactNativeText,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { propsToStyle, sizeScale } from '@common';
import { useTheme } from '@theme';
import { FontDefault } from '@theme/typography';

import { textPresets } from './preset';
import { TextProps } from './type';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export const Text = ({
  t18n,
  text,
  flex,
  color,
  center,
  children,
  fontSize,
  textAlign,
  fontStyle,
  lineHeight,
  fontWeight,
  fontFamily,
  colorTheme,
  t18nOptions,
  textTransform,
  letterSpacing,
  preset = 'default',
  style: styleOverride = {},
  ...rest
}: TextProps) => {
  // state
  const theme = useTheme();

  const [t] = useTranslation();

  const i18nText = useMemo(
    () => t18n && t(t18n, t18nOptions),
    [t18n, t18nOptions, t],
  );

  const content = useMemo(
    () => i18nText || text || children,
    [i18nText, text, children],
  );

  const styleComponent = useMemo<StyleProp<TextStyle>>(
    () => [
      [
        textPresets[preset],
        flex === true && styles.flex,
        fontSize !== undefined && { fontSize: sizeScale(fontSize) },
        fontFamily !== undefined && { fontFamily: FontDefault[fontFamily] },
        colorTheme !== undefined && { color: theme.colors[colorTheme] },
        center && { textAlign: 'center' },
        propsToStyle([
          { fontWeight },
          { color },
          { textAlign },
          { textTransform },
          { fontStyle },
          { letterSpacing },
          { lineHeight },
        ]),
      ],
    ],
    [
      preset,
      flex,
      fontSize,
      fontFamily,
      colorTheme,
      theme.colors,
      center,
      fontWeight,
      color,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
    ],
  );

  // render
  return (
    <ReactNativeText
      allowFontScaling={false}
      {...rest}
      style={[styleComponent, styleOverride]}>
      {content}
    </ReactNativeText>
  );
};
