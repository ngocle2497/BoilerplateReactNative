import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { DividerProps } from './Divider.props'
import { Block } from '../Block/Block'
import equals from 'react-fast-compare';
const styles = StyleSheet.create({
    wrap: {
        width: '100%'
    }
})

const DividerComponent = (props: DividerProps) => {
    const { height = StyleSheet.hairlineWidth, bg = '#dfe3ee' } = props;
    return (
        <Block height={height} color={bg} style={styles.wrap} />
    )
}
export const Divider = memo(DividerComponent, (prevProps, nextProps) => equals(prevProps, nextProps))

