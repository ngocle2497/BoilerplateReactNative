import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { BlockProps } from './Block.props'
import { mergeAll, flatten, equals } from 'ramda'

const styles = StyleSheet.create({
    block: {
        flex: 1,
    }
})

const BlockComponent = (props: BlockProps) => {
    const { block, margin, marginLeft, marginRight, marginTop, marginBottom, direction, padding, paddingHorizontal,
        paddingVertical, width, height, border, borderWidth, borderColor,
        color, justifyContent, middle, borderRadius, shadow, style = {}, children, ...rest } = props;

    const styleComponent = [
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
        mergeAll(flatten([style]))
    ]
    return (
        <View style={styleComponent} {...rest}>
            {children}
        </View>
    )
}
export const Block = memo(BlockComponent, (prevProps, nextProps) => equals(prevProps, nextProps))


