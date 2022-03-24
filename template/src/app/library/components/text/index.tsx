import React, { memo, useMemo } from 'react';
import {
  Text as ReactNativeText,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';

import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { enhance, propsToStyle, sizeScale } from '@common';
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
    tx,
    txOptions,
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
  const i18nText = useMemo(() => tx && t(tx, txOptions), [tx, txOptions, t]);
  const content = useMemo(
    () => i18nText || text || children,
    [i18nText, text, children],
  );

  const styleComponent = useMemo(
    () =>
      enhance([
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
          enhance([styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
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
      styleOverride,
    ],
  );
  // render
  return (
    <ReactNativeText
      allowFontScaling={false}
      {...rest}
      style={[styleComponent]}>
      {content}
    </ReactNativeText>
  );
};
export const Text = memo(TextComponent, equals);
