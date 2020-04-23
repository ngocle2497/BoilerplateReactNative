import React, { useMemo } from 'react'
import { StyleSheet, } from 'react-native'
import { SizeBoxProps } from './SizeBox.props'
import { mergeAll, flatten } from 'ramda';
import { Block } from '../Block/Block';

export const SizeBox = (props: SizeBoxProps) => {
    const { children, style = {}, height = 0, width = 0, backgroundColor = 'transparent' } = props;
    return useMemo(() => {
        const actualStyle = mergeAll(flatten([{ width, height, backgroundColor }, style]));
        return (
            <Block style={actualStyle}>
                {children && children}
            </Block>
        )
    }, [props])
}


const styles = StyleSheet.create({})
