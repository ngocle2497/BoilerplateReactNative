import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Text/Text';
import { CheckboxProps } from './CheckBox.props';
import { enhance } from '@common'
import equals from 'react-fast-compare';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '@config/type';
import { Button } from '../Button/Button';
import { Block } from '../Block/Block';
const DIMENSIONS = { width: 16, height: 16 };
const styles = () => {
  const theme: AppTheme = useTheme()
  return React.useMemo(() => StyleSheet.create({
    ROOT: {
      flexDirection: 'row',
      paddingVertical: theme.spacing.tiny,
      alignSelf: 'flex-start',
    },
    OUTLINE: {
      ...DIMENSIONS,
      marginTop: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primaryDarker,
      borderRadius: 1,
    },
    FILL: {
      width: DIMENSIONS.width - 4,
      height: DIMENSIONS.height - 4,
      backgroundColor: theme.colors.primary,
    },
    LABEL: {
      paddingLeft: theme.spacing.smaller,
    }
  }), [theme])
}

const CheckBoxComponent = (props: CheckboxProps) => {
  const numberOfLines = props.multiline ? 0 : 1;

  const rootStyle = React.useMemo(() => enhance([styles().ROOT, props.style ?? {}]), [props.style]);
  const outlineStyle = React.useMemo(() => enhance([styles().OUTLINE, props.outlineStyle ?? {}]), [props.outlineStyle]);
  const fillStyle = React.useMemo(() => enhance([styles().FILL, props.fillStyle ?? {}]), [props.fillStyle]);
  const labelStyle = React.useMemo(() => styles().LABEL, [])
  const onPress = React.useCallback(() => {
    props.onToggle && props.onToggle(!props.value)
  }, [props.onToggle])
  return (
    <Button
      activeOpacity={1}
      preset={'link'}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}>
      <>
        <Block style={outlineStyle}>
          {props.value && <Block style={fillStyle} />}
        </Block>
        <Text
          text={props.text}
          tx={props.tx}
          numberOfLines={numberOfLines}
          style={labelStyle}
        />
      </>
    </Button>
  )
}
export const CheckBox = React.memo(CheckBoxComponent, (prevProps, nextProps) => equals(prevProps, nextProps))