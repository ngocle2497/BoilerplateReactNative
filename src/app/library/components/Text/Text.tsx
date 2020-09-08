import { enhance } from '@common';
import { FontSizeDefault } from '@theme/fontSize';
import { FontDefault } from '@theme/typography';
import React, { memo, useMemo } from 'react';
import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextStyle,
} from 'react-native';
import { TextProps } from './Text.props';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const TextComponent = (props: TextProps) => {
  const {
    tx,
    txOptions,
    text,
    children,
    flex,
    fontSize = 'FONT_13',
    fontWeight,
    fontFamily,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    padding,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    width,
    height,
    alignItems,
    alignSelf,
    color,
    center,
    textAlignVertical,
    textTransform,
    textAlign,
    fontStyle,
    letterSpacing,
    lineHeight,
    style: styleOverride = {},
    ...rest
  } = props;
  const [t] = useTranslation();
  const i18nText = useMemo(() => tx && t(tx, txOptions), [tx, txOptions])
  const content = useMemo(() => i18nText || text || children, [i18nText, text, children]);

  const styleComponent = useMemo(
    () =>
      enhance([
        [
          flex && styles.flex,
          margin && { margin },
          fontSize && { fontSize: FontSizeDefault[fontSize] },
          fontWeight && { fontWeight },
          fontFamily && { fontFamily: FontDefault[fontFamily] },
          marginLeft && { marginLeft },
          marginRight && { marginRight },
          marginTop && { marginTop },
          marginBottom && { marginBottom },
          padding && { padding },
          paddingHorizontal && { paddingHorizontal },
          paddingRight && { paddingRight },
          paddingBottom && { paddingBottom },
          paddingLeft && { paddingLeft },
          paddingTop && { paddingTop },
          paddingVertical && { paddingVertical },
          width && { width },
          height && { height },
          color && { color: color },
          center && { textAlign: 'center' },
          textAlign && { textAlign },
          alignItems && { alignItems },
          alignSelf && { alignSelf },
          textTransform && { textTransform },
          textAlignVertical && { textAlignVertical },
          fontStyle && { fontStyle },
          letterSpacing && { letterSpacing },
          lineHeight && { lineHeight },
          enhance([styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      flex,
      fontSize,
      fontWeight,
      fontFamily,
      margin,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      padding,
      paddingHorizontal,
      paddingVertical,
      width,
      height,
      color,
      center,
      paddingRight,
      paddingBottom,
      paddingLeft,
      alignItems,
      alignSelf,
      paddingTop,
      textAlignVertical,
      textTransform,
      textAlign,
      styleOverride,
    ],
  );
  return (
    <ReactNativeText allowFontScaling={false} {...rest} style={styleComponent}>
      {content}
    </ReactNativeText>
  );
};
export const Text = memo(TextComponent, equals);
