import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { DividerProps } from './Divider.props'
import { Block } from '../'
const styles = StyleSheet.create({
    wrap: {
        width: '100%'
    }
})

export const Divider = (props: DividerProps) => {
    const { height = 2, bg = '#dfe3ee' } = props;
    return useMemo(() => (
        <Block height={height} color={bg} style={styles.wrap} />
    ), [props])
}


