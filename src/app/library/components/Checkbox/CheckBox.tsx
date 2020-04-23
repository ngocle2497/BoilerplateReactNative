import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '..';
import { CheckboxProps } from './Checkbox.props';
import { mergeAll, flatten } from 'ramda';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../../../config/type';
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

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1;

  const rootStyle = mergeAll(flatten([styles().ROOT, props.style ?? {}]));
  const outlineStyle = mergeAll(flatten([styles().OUTLINE, props.outlineStyle ?? {}]));
  const fillStyle = mergeAll(flatten([styles().FILL, props.fillStyle ?? {}]));
  const labelStyle = styles().LABEL
  const onPress = props.onToggle
    ? () => props.onToggle && props.onToggle(!props.value)
    : undefined;
  const dependencyList = [rootStyle, outlineStyle, fillStyle, ...props.dependency = []]
  return React.useMemo(() => <Button
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
  </Button>, dependencyList)
}
