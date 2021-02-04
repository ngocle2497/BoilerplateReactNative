/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-native/no-unused-styles */
import React, {useMemo, memo} from 'react';
import {StyleSheet} from 'react-native';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SpacingDefault} from '@theme/spacing';

import {Block} from '../Block/Block';
import {Icon} from '../Icon/Icon';
import {Text} from '../Text/Text';
import {Button} from '../Button/Button';

import {HeaderProps} from './Header.props';

const styles = () => {
  const inset = useSafeAreaInsets();
  return useMemo(
    () =>
      StyleSheet.create({
        ROOT: {
          flexDirection: 'row',
          paddingHorizontal: SpacingDefault.tiny,
          alignItems: 'center',
          paddingTop: inset.top + SpacingDefault.tiny,
          paddingBottom: SpacingDefault.small,
          justifyContent: 'flex-start',
        },
        TITLE: {
          textAlign: 'center',
        },
        TITLE_MIDDLE: {
          flex: 1,
          justifyContent: 'center',
        },
        LEFT: {
          width: 32,
        },
        RIGHT: {
          width: 32,
        },
        WRAP_ICON: {
          paddingVertical: 10,
          paddingHorizontal: 10,
        },
      }),
    [inset],
  );
};

const HeaderComponent: React.FunctionComponent<HeaderProps> = (props) => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style = {},
    titleStyle = {},
    childrenLeft,
    childrenRight,
    styleLeft = {},
    styleRight = {},
  } = props;
  const [t] = useTranslation();
  const header = headerText || (headerTx && t(headerTx)) || '';

  const wrapStyle = enhance([styles().ROOT, style]);
  const title = enhance([styles().TITLE, titleStyle]);
  const LEFT = enhance([styles().WRAP_ICON, styleLeft]);
  const RIGHT = enhance([styles().WRAP_ICON, styleRight]);
  const viewLeft = styles().LEFT;
  const viewMiddle = styles().TITLE_MIDDLE;
  const viewRight = styles().RIGHT;

  return (
    <Block style={wrapStyle}>
      {leftIcon ? (
        <Button style={LEFT} preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : childrenLeft ? (
        {childrenLeft}
      ) : (
        <Block style={viewLeft} />
      )}
      <Block style={viewMiddle}>
        <Text style={title} text={header} />
      </Block>
      {rightIcon ? (
        <Button style={RIGHT} preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : childrenRight ? (
        {childrenRight}
      ) : (
        <Block style={viewRight} />
      )}
    </Block>
  );
};
export const Header = memo(HeaderComponent, equals);
