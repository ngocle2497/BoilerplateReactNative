import * as React from 'react';
import { View, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { HeaderProps } from './header.props';
import { Button, Icon, Text } from '../';
import { mergeAll, flatten } from 'ramda';
import { translate } from '../../../library/utils';
import { AppTheme } from '../../../config/type';
import { useTheme } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-view';

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
    style,
    titleStyle,
    childrenLeft,
    childrenRight,
    styleLeft,
    styleRight,
    dependency = []
  } = props;
  const header = headerText || (headerTx && translate(headerTx)) || '';

  const wrapStyle = mergeAll(flatten([styles().ROOT, style]));
  const title = mergeAll(flatten([styles().TITLE, titleStyle]));
  const LEFT = mergeAll(flatten([styles().WRAP_ICON, styleLeft]));
  const RIGHT = mergeAll(flatten([styles().WRAP_ICON, styleRight]));
  const viewLeft = styles().LEFT;
  const viewMiddle = styles().TITLE_MIDDLE;
  const viewRight = styles().RIGHT;
  const dependencyList = [wrapStyle, title, LEFT, RIGHT, ...dependency]
  return React.useMemo(() => (
    <View style={wrapStyle}>
      {leftIcon ? (
        <Button style={LEFT} preset="link" onPress={onLeftPress}>
          <Icon dependency={[]} icon={leftIcon} />
        </Button>
      ) : childrenLeft ? { childrenLeft } : (
        <View style={viewLeft} />
      )}
      <View style={viewMiddle}>
        <Text style={title} text={header} />
      </View>
      {rightIcon ? (
        <Button style={RIGHT} preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : childrenRight ? { childrenRight } : (
        <View style={viewRight} />
      )}
    </View>
  ), dependencyList)
};
