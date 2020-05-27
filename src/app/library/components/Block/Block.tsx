import React, { memo, useMemo } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
import { BlockProps } from './Block.props'
import equals from 'react-fast-compare'
import { enhance } from '@common'
const styles = StyleSheet.create({
    block: {
        flex: 1,
    }
})

const BlockComponent = (props: BlockProps) => {
    const { block, margin, marginLeft, marginRight, marginTop, marginBottom, direction, padding, paddingHorizontal,
        paddingVertical, width, height, border, borderWidth, borderColor,
        color, justifyContent, middle, borderRadius, shadow, style = {}, children, ...rest } = props;

    const styleComponent = useMemo(() => [
        block && styles.block,
        margin && { margin },
        marginLeft && { marginLeft },
        marginRight && { marginRight },
        marginTop && { marginTop },
        marginBottom && { marginBottom },
        direction && { flexDirection: direction },
        padding && { padding },
        paddingHorizontal && { paddingHorizontal },
        paddingVertical && { paddingVertical },
        width && { width },
        height && { height },
        border && { borderWidth: 1, borderColor: 'gray' },
        borderWidth && { borderWidth },
        borderColor && { borderColor },
        color && { backgroundColor: color },
        justifyContent && { justifyContent },
        middle && { alignItems: 'center' },
        borderRadius && { borderRadius },
        shadow && {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        enhance([style])
    ] as StyleProp<ViewStyle>, [props])
    return (
        <View style={styleComponent} {...rest}>
            {children}
        </View>
    )
}
export const Block = memo(BlockComponent, (prevProps, nextProps) => equals(prevProps, nextProps))


