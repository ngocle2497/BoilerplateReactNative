import React from 'react'
import { StyleSheet, Animated } from 'react-native'
import { Button } from '../../../Button/Button'
import { Icon } from '../../../Icon/Icon'
import { Text } from '../../../Text/Text'
import { IconTypes } from '@assets/icon'

export const SIZE_BUTTON_GROUP = 40
export const SPACE_BETWEEN = 10
const styles = StyleSheet.create({
    root: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 5,
    },
    wrap: {
        width: SIZE_BUTTON_GROUP,
        height: SIZE_BUTTON_GROUP,
        borderRadius: SIZE_BUTTON_GROUP / 2,
        backgroundColor: '#99aab5',
        shadowColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    wrapLabel: {
        paddingHorizontal: 12,
        paddingVertical: 0,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginRight: 10,
        borderRadius: 5,
    },
    text: {
        fontFamily: undefined,
        fontWeight: 'normal',
    }
})

interface ButtonGroupProps {
    icon: IconTypes;

    onPress: (onPressItem: () => void) => void;

    onPressItem?: any;

    progress: Animated.Value;

    index: number;

    label?: string;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
    const { icon, onPress, onPressItem, index, label, progress } = props;
    const bottom = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-(SPACE_BETWEEN + SIZE_BUTTON_GROUP), SPACE_BETWEEN]
    })
    const opacity = progress.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [0, 0, 1]
    })
    const _onPress = () => {
        onPress && onPress(onPressItem)
    }
    return (
        <Animated.View style={[styles.root, { marginBottom: bottom, opacity }]}>
            {label && <Animated.View style={[styles.wrapLabel]}>
                <Text style={[styles.text]} text={label} />
            </Animated.View>}
            <Button activeOpacity={0.6} onPress={_onPress} preset={'link'} style={[styles.wrap]}>
                <Icon icon={icon} />
            </Button>
        </Animated.View>
    )
}



