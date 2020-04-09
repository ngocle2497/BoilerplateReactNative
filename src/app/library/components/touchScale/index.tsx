import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, useValues, withTimingTransition, between } from 'react-native-redash';
import Animated, { interpolate, eq, useCode, cond, and, call, block, not, onChange, set } from 'react-native-reanimated';
import { TouchableScaleProps } from './touch.props';

export const TouchableScale = (props: TouchableScaleProps) => {
    const { children, minScale = 0.95, onPress, onLongPress, onPressIn, onPressOut } = props
    const [state, translationY, translationX, x, y] = useValues([State.UNDETERMINED, 0, 0, 0, 0], [])
    const duration = cond(eq(state, State.BEGAN), 300, 150)
    const progress = withTimingTransition(eq(state, State.BEGAN), { duration: duration })
    const _onGestureHandler = onGestureEvent({ state, translationY, translationX, x, y })
    const scale = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, minScale]
    })
    useCode(() =>
        onChange(scale, block([
            cond(eq(scale, minScale), [
                set(state, State.UNDETERMINED),
                call([], ([]) => {
                    onLongPress && onLongPress()
                })
            ]),
            cond(and(eq(state, State.END), between(translationX, -5, 5), between(translationY, -5, 5)),
                [set(state, State.UNDETERMINED), call([], ([]) => {
                    onPressIn && onPressIn()
                    onPressOut && onPressOut()
                    onPress && onPress()
                }
                )])
        ]))
        , [])
    return (
        <PanGestureHandler {..._onGestureHandler}>
            <Animated.View style={[{ transform: [{ scale }] }]}>
                {children}
            </Animated.View>
        </PanGestureHandler>
    )
}