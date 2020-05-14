import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import isEqual from 'react-fast-compare'
import { ItemAlphabetProps } from '../type'
import { createNativeWrapper, TouchableWithoutFeedback, State } from 'react-native-gesture-handler'
import { onGestureEvent, useValues } from 'react-native-redash'
import Animated, { useCode, call, cond, eq } from 'react-native-reanimated'


const Touchable = createNativeWrapper(Animated.createAnimatedComponent(TouchableWithoutFeedback), {
    shouldActivateOnStart: true,
    shouldCancelWhenOutside: false
})

const ItemAlphabetComponent = ({ title, index }: ItemAlphabetProps) => {

    return (
        <Touchable>
            <Text>{title}</Text>
        </Touchable>
    )
}

export default memo(ItemAlphabetComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))
