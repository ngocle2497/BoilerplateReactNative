import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';
import { styles } from './Text.presets';
import { TextProps } from './Text.props';
import { mergeAll, flatten, equals } from 'ramda';
import { useTranslation } from 'react-i18next';

const TextComponent = (props: TextProps) => {
  const {
    preset = 'default',
    tx,
    txOptions,
    text,
    children,
    style: styleOverride = {},
    ...rest
  } = props;
  const [t] = useTranslation()
  const i18nText = tx && t(tx, txOptions);
  const content = i18nText || text || children;

  const style = mergeAll(
    flatten([styles()[preset] || styles().default, styleOverride]),
  );
  return (
    <ReactNativeText allowFontScaling={false} {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}
export const Text = React.memo(TextComponent, (prevProps, nextProps) => equals(prevProps, nextProps))