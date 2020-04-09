import React from 'react'
import { StyleSheet, Text, View, I18nManager } from 'react-native'
import Animated, { Clock, useCode, set, call, clockRunning, cond, not, Easing } from 'react-native-reanimated'
import { DotRippleProps } from './index'
import { timing, useValues } from 'react-native-redash';
const RADIUS = 10;

interface DotProps {
    dot: DotRippleProps;
    rippleColor?: string;
    rippleFade?: boolean;
    rippleOpacity?: number;
    rippleDuration?: number;
    callBack?: Function;
}

export const DotRipple = ({ dot: { unique, progress, locationX, locationY, R },
    rippleColor = 'rgb(0, 0, 0)', rippleFade = true, rippleOpacity = 0.30, rippleDuration = 400,
    callBack }: DotProps) => {
    const clock = new Clock();
    const scale = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5 / RADIUS, R / RADIUS]
    })
    const opacity = rippleFade ?
        progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0]
        }) : rippleOpacity
    const styleRipple = {
        top: locationY - RADIUS,
        [I18nManager.isRTL ? 'right' : 'left']: locationX - RADIUS,
        backgroundColor: rippleColor,
        transform: [{ scale }],
        opacity
    };

    useCode(() => [
        set(progress, timing({ to: 1, clock: clock, duration: rippleDuration, from: 0, easing: Easing.out(Easing.ease) })),
        cond(not(clockRunning(clock)), call([], ([]) => {
            callBack && callBack()
        }))
    ]
        , [])
    return (
        <Animated.View pointerEvents={'none'} style={[styles.ripple, styleRipple]} />
    )
}

const styles = StyleSheet.create({

    ripple: {
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: RADIUS,
        overflow: 'hidden',
        position: 'absolute',
    },
})
