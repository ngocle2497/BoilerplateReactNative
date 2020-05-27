import React, { useMemo, memo } from 'react'
import { StyleSheet } from 'react-native'
import { HelperTextProps } from './HelperText.prop'
import { Text } from '../Text/Text'
import { AppTheme } from '@config/type'
import { useTheme } from '@react-navigation/native'
import { enhance } from '@common'
import equals from 'react-fast-compare'
import { Block } from '../Block/Block'
const styles = () => {
    const theme: AppTheme = useTheme()
    return useMemo(() => (StyleSheet.create({
        container: {
            paddingTop: 3,
            paddingBottom: 4,
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%'
        },
        textInfo: {
            color: theme.colors.error
        },
        textError: {
            color: theme.colors.info
        },
        text: {
            fontWeight: 'normal'
        }
    })), [])
}
const HelperTextComponent = (props: HelperTextProps) => {
    const { visible, msg, type } = props;
    const containerStyle = styles().container;
    const textStyle = useMemo(() => enhance([styles().text, type === 'error' ? styles().textError : styles().textInfo]), []);
    return (
        <Block style={[containerStyle]}>
            <Text numberOfLines={1} style={[textStyle]}>{visible ? (msg ?? '') : ''}</Text>
        </Block>
    )
}
export const HelperText = memo(HelperTextComponent, (prevProps, nextProps) => equals(prevProps, nextProps))

