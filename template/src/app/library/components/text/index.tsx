import React, { memo, useMemo } from 'react';
import {
  Text as ReactNativeText,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { propsToStyle, sizeScale } from '@common';
import { useTheme } from '@theme';
import { FontDefault } from '@theme/typography';

import { TextProps } from './type';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const TextComponent = (props: TextProps) => {
  // state
  const theme = useTheme();
  const {
    t18n,
    t18nOptions,
    text,
    children,
    flex,
    fontSize = 14,
    fontWeight,
    fontFamily = 'primary',
    color,
    center,
    textTransform,
    textAlign,
    fontStyle,
    letterSpacing,
    lineHeight,
    colorTheme,
    style: styleOverride = {},
    ...rest
  } = props;
  const [t] = useTranslation();
  const i18nText = useMemo(
    () => t18n && t(t18n, t18nOptions),
    [t18n, t18nOptions, t],
  );
  const content = useMemo(
    () => i18nText || text || children,
    [i18nText, text, children],
  );

  const styleComponent = useMemo<StyleProp<ViewStyle>>(
    () => [
      [
        flex === true && styles.flex,
        { fontSize: sizeScale(fontSize) },
        { fontFamily: FontDefault[fontFamily] },
        colorTheme && { color: theme.colors[colorTheme] },
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
      flex,
      fontSize,
      fontWeight,
      fontFamily,
      color,
      colorTheme,
      theme.colors,
      center,
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
export const Text = memo(TextComponent, equals);
