import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { DividerProps } from './Divider.props'
import { Block } from '../'
import { equals } from 'ramda'
const styles = StyleSheet.create({
    wrap: {
        width: '100%'
    }
})

const DividerComponent = (props: DividerProps) => {
    const { height = 2, bg = '#dfe3ee' } = props;
    return (
        <Block height={height} color={bg} style={styles.wrap} />
    )
}
export const Divider = memo(DividerComponent, (prevProps, nextProps) => equals(prevProps, nextProps))

