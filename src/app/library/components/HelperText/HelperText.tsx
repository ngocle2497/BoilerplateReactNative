import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { HelperTextProps } from './HelperText.prop'
import { Text } from '..'
import { AppTheme } from '../../../config/type'
import { useTheme } from '@react-navigation/native'
import { mergeAll, flatten } from 'ramda'
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
export const HelperText = (props: HelperTextProps) => {
    const { visible, msg, type } = props;
    const theme: AppTheme = useTheme()
    const containerStyle = styles().container;

    const textStyle = mergeAll(flatten([styles().text, type === 'error' ? styles().textError : styles().textInfo]));
    return useMemo(() => {
        return (
            <View style={[containerStyle]}>
                <Text numberOfLines={1} style={[textStyle]}>{visible ? (msg ?? '') : ''}</Text>
            </View>
        )
    }, [props, theme])
}


