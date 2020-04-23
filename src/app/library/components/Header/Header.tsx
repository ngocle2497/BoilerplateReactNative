import * as React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderProps } from './Header.props';
import { Button, Icon, Text } from '..';
import { mergeAll, flatten } from 'ramda';
import { AppTheme } from '../../../config/type';
import { useTheme } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-view';
import { useTranslation } from 'react-i18next';
import { Block } from '../Block/Block';

const styles = () => {
  const theme: AppTheme = useTheme();
  const inset = useSafeArea();
  return React.useMemo(() =>
    StyleSheet.create({
      ROOT: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.tiny,
        alignItems: 'center',
        paddingTop: inset.top + theme.spacing.tiny,
        paddingBottom: theme.spacing.small,
        justifyContent: 'flex-start',
      },
      TITLE: {
        textAlign: 'center'
      },
      TITLE_MIDDLE: {
        flex: 1,
        justifyContent: 'center'
      },
      LEFT: {
        width: 32
      },
      RIGHT: {
        width: 32
      },
      WRAP_ICON: {
        paddingVertical: 10,
        paddingHorizontal: 10
      }
    })
    , [theme, inset])
}

export const Header: React.FunctionComponent<HeaderProps> = props => {
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
  const [t] = useTranslation()
  const header = headerText || (headerTx && t(headerTx)) || '';

  const wrapStyle = mergeAll(flatten([styles().ROOT, style]));
  const title = mergeAll(flatten([styles().TITLE, titleStyle]));
  const LEFT = mergeAll(flatten([styles().WRAP_ICON, styleLeft]));
  const RIGHT = mergeAll(flatten([styles().WRAP_ICON, styleRight]));
  const viewLeft = styles().LEFT;
  const viewMiddle = styles().TITLE_MIDDLE;
  const viewRight = styles().RIGHT;
  return (
    <Block style={wrapStyle}>
      {leftIcon ? (
        <Button style={LEFT} preset="link" onPress={onLeftPress}>
          <Icon dependency={[]} icon={leftIcon} />
        </Button>
      ) : childrenLeft ? { childrenLeft } : (
        <Block style={viewLeft} />
      )}
      <Block style={viewMiddle}>
        <Text style={title} text={header} />
      </Block>
      {rightIcon ? (
        <Button style={RIGHT} preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : childrenRight ? { childrenRight } : (
        <Block style={viewRight} />
      )}
    </Block>
  )
};
