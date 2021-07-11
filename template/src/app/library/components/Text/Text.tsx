import {enhance} from '@common';
import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';
import {FontSizeDefault} from '@theme/fontSize';
import {FontDefault} from '@theme/typography';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {useTranslation} from 'react-i18next';
import {
  StyleProp,
  StyleSheet,
  Text as ReactNativeText,
  TextStyle,
} from 'react-native';

import {TextProps} from './Text.props';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const TextComponent = (props: TextProps) => {
  // state
  const theme: AppTheme = useTheme();
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
          flex && styles.flex,
          {margin},
          fontSize && {fontSize: FontSizeDefault[fontSize]},
          {fontWeight},
          fontFamily && {fontFamily: FontDefault[fontFamily]},
          {marginLeft},
          {marginRight},
          {marginTop},
          {marginBottom},
          {padding},
          {paddingHorizontal},
          {paddingRight},
          {paddingBottom},
          {paddingLeft},
          {paddingTop},
          {paddingVertical},
          {width},
          {height},
          {color},
          colorTheme && {color: theme.colors[colorTheme]},
          center && {textAlign: 'center'},
          {textAlign},
          {alignItems},
          {alignSelf},
          {textTransform},
          {textAlignVertical},
          {fontStyle},
          {letterSpacing},
          {lineHeight},
          enhance([styleOverride]),
        ] as StyleProp<TextStyle>,
      ]),
    [
      flex,
      margin,
      fontSize,
      fontWeight,
      fontFamily,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      padding,
      paddingHorizontal,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingTop,
      paddingVertical,
      width,
      height,
      color,
      colorTheme,
      theme.colors,
      center,
      textAlign,
      alignItems,
      alignSelf,
      textTransform,
      textAlignVertical,
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
