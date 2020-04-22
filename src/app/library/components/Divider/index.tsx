import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DividerProps } from './Divider.props'

const styles = StyleSheet.create({
    wrap: {
        width: '100%'
    }
})

export const Divider = (props: DividerProps) => {
    const { height = 2, bg = '#dfe3ee' } = props;
    return useMemo(() => (
        <View style={[styles.wrap, { height: height, backgroundColor: bg }]} />
    ), [props])
}


