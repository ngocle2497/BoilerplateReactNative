import * as React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderProps } from './Header.props';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { Block } from '../Block/Block';
import { enhance } from '@common'
import equals from 'react-fast-compare'
import { AppTheme } from '@config/type';
import { useTheme } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-view';
import { useTranslation } from 'react-i18next';

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

const HeaderComponent: React.FunctionComponent<HeaderProps> = props => {
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

  const wrapStyle = React.useMemo(() => enhance([styles().ROOT, style]), [style]);
  const title = React.useMemo(() => enhance([styles().TITLE, titleStyle]), [titleStyle]);
  const LEFT = React.useMemo(() => enhance([styles().WRAP_ICON, styleLeft]), [styleLeft]);
  const RIGHT = React.useMemo(() => enhance([styles().WRAP_ICON, styleRight]), [styleRight]);
  const viewLeft = React.useMemo(() => styles().LEFT, []);
  const viewMiddle = React.useMemo(() => styles().TITLE_MIDDLE, []);
  const viewRight = React.useMemo(() => styles().RIGHT, []);
  
  return (
    <Block style={wrapStyle}>
      {leftIcon ? (
        <Button style={LEFT} preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
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
export const Header = React.memo(HeaderComponent, (prevProps, nextProps) => equals(prevProps, nextProps))