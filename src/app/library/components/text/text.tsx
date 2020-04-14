import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';
import { styles } from './text.presets';
import { TextProps } from './text.props';
import { translate } from '../../../library/utils';
import { mergeAll, flatten } from 'ramda';

export function Text(props: TextProps) {
  const {
    preset = 'default',
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    dependency = [],
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const style = mergeAll(
    flatten([styles()[preset] || styles().default, styleOverride]),
  );
  const dependencyList = [props, ...dependency]
  return React.useMemo(() => (
    <ReactNativeText allowFontScaling={false} {...rest} style={style}>
      {content}
    </ReactNativeText>
  ), dependencyList)
}
