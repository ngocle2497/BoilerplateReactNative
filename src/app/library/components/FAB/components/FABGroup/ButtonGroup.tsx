import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Text } from '../../../'
import { IconTypes } from '../../../../../assets/icon'
import Animated, { interpolate } from 'react-native-reanimated'

export const SIZE_BUTTON_GROUP = 40
const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        borderRadius:5,
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

    progress: Animated.Node<number>;

    index: number;

    label?: string;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
    const { icon, onPress, onPressItem, index, label, progress } = props;
    const bottom = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-SIZE_BUTTON_GROUP, index * SIZE_BUTTON_GROUP + (index + 1) * 10]
    })
    const opacity = interpolate(progress, {
        inputRange: [0, 0.2, 1],
        outputRange: [0, 0, 1]
    })
    const _onPress = () => {
        onPress && onPress(onPressItem)
    }
    return (
        <Animated.View style={[styles.root, { bottom, opacity }]}>
            {label && <Animated.View style={[styles.wrapLabel, { opacity }]}>
                <Text style={[styles.text]} text={label} />
            </Animated.View>}
            <Button activeOpacity={0.6} onPress={_onPress} preset={'link'} style={[styles.wrap]}>
                <Icon icon={icon} />
            </Button>
        </Animated.View>
    )
}



