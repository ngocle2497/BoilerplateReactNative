import React, { memo } from 'react'
import { PanGestureHandler, State, TapGestureHandler, LongPressGestureHandler, LongPressGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { onGestureEvent, useValue, withTransition } from 'react-native-redash';
import Animated, { interpolate, eq, cond, } from 'react-native-reanimated';
import { TouchableScaleProps } from './Touch.props';
import { equals } from 'ramda';
const TouchableScaleComponent = (props: TouchableScaleProps) => {
    const { children, minScale = 0.9, onPress, onLongPress, onPressIn, onPressOut } = props;
    const state = useValue(State.UNDETERMINED)
    const duration = cond(eq(state, State.ACTIVE), 300, 150)
    const progress = withTransition(eq(state, State.BEGAN), { duration: duration })
    const _onGestureHandler = onGestureEvent({ state })
    const scale = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, minScale]
    })
    const _onHandlerLongPress = (e: LongPressGestureHandlerGestureEvent) => {
        if (e.nativeEvent.state === State.ACTIVE && onLongPress && typeof onLongPress === 'function') {
            onLongPress()
        }
    }
    const _onHandlerPress = (e: LongPressGestureHandlerGestureEvent) => {
        if (e.nativeEvent.state === State.ACTIVE && onPress && typeof onPress === 'function') {
            onPressIn && onPressIn()
            onPress()
            onPressOut && onPressOut()
        }
    }
    return (
        <PanGestureHandler {..._onGestureHandler}>
            <Animated.View>
                <LongPressGestureHandler maxDist={5} onHandlerStateChange={_onHandlerLongPress}>
                    <TapGestureHandler onHandlerStateChange={_onHandlerPress}>
                        <Animated.View style={[{ transform: [{ scale }] }]}>
                            {children}
                        </Animated.View>
                    </TapGestureHandler>
                </LongPressGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    )
}
export const TouchableScale = memo(TouchableScaleComponent, (prevProps, nextProps) => equals(prevProps, nextProps))