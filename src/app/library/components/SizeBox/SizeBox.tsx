import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SizeBoxProps } from './SizeBox.props'
import { mergeAll, flatten } from 'ramda';

export const SizeBox = (props: SizeBoxProps) => {
    const { children, style = {}, height = 0, width = 0, backgroundColor = 'transparent' } = props;
    return useMemo(() => {
        const actualStyle = mergeAll(flatten([{ width, height, backgroundColor }, style]));
        return (
            <View style={actualStyle}>
                {children && children}
            </View>
        )
    }, [props])
}


const styles = StyleSheet.create({})
