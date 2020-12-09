import { between, clamp, timing, usePanGestureHandler, withOffset } from '@animated'
import React, { memo, useCallback, useState } from 'react'
import isEqual from 'react-fast-compare'
import { View, LayoutChangeEvent, StyleSheet } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { abs, add, and, call, cond, divide, eq, multiply, onChange, set, sub, useCode, useValue, Value } from 'react-native-reanimated'
import { Text } from '../Text/Text'
import { ACTIVE_COLOR, HEIGHT_SLIDER, IN_ACTIVE_COLOR, LOWER_BOUND, THUMB_SIZE, UPPER_BOUND } from './constants'
import { SliderProps } from './type'
import { onCheckType } from '@common'

const styles = StyleSheet.create({
    root: {
        width: '100%'
    },
    container: {
        height: HEIGHT_SLIDER,
        backgroundColor: IN_ACTIVE_COLOR,
        width: '100%'
    },
    thumb: {
        position: 'absolute',
        top: -THUMB_SIZE + HEIGHT_SLIDER / 2,
        left: 0,
        width: THUMB_SIZE * 2,
        height: THUMB_SIZE * 2,
        borderRadius: THUMB_SIZE,
        backgroundColor: ACTIVE_COLOR,
    },
    track: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: ACTIVE_COLOR,
    },
    wrapValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: THUMB_SIZE
    }
})


const Slider_LinearComponent = ({ lowerBound = LOWER_BOUND, upperBound = UPPER_BOUND, initialLinear = 50, onChangeLinear }: Omit<SliderProps, 'type'>) => {
    if (lowerBound >= upperBound) {
        throw Error("lowerBound must be less than upperBound")
    }
    const [width, setWidth] = useState<number>(0)
    const offset = new Value(0)
    const initialTranslateX = useValue(-THUMB_SIZE)
    const { gestureHandler, state, translation, } = usePanGestureHandler()
    const translateX = cond(eq(state, State.UNDETERMINED),
        initialTranslateX,
        clamp(withOffset(translation.x, state, offset), -THUMB_SIZE, width - THUMB_SIZE))

    const rightTrack = sub(width, translateX, THUMB_SIZE)

    const _onLayout = useCallback(({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
        setWidth(width)
    }, [])

    useCode(() => onChange(translateX, [
        call([multiply(divide(add(translateX, THUMB_SIZE), width), abs(sub(upperBound, lowerBound)))], (arg) => {
            if (onChangeLinear && onCheckType(onChangeLinear, 'function')) {
                onChangeLinear(parseFloat(parseFloat(String(arg[0])).toFixed(1)))
            }
        })
    ]), [translateX])

    useCode(() => [
        cond(
            and(
                eq(state, State.UNDETERMINED),
                eq(between(initialLinear, lowerBound, upperBound), 1)
            ),
            [
                set(offset, sub(multiply(width, divide(initialLinear, upperBound)), THUMB_SIZE)),
                set(initialTranslateX, timing({ from: initialTranslateX, to: sub(multiply(width, divide(initialLinear, upperBound)), THUMB_SIZE) }))
            ]
        )
    ], [width, state])

    return (
        <View onLayout={_onLayout} style={[styles.root]}>
            <View style={[styles.container]}>
                <Animated.View style={[styles.track, { right: rightTrack }]} />
                <PanGestureHandler {...gestureHandler}>
                    <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
                </PanGestureHandler>
            </View>
            <View style={[styles.wrapValue]}>
                <Text>{lowerBound}</Text>
                <Text>{upperBound}</Text>
            </View>
        </View>
    )
}

export const Slider_Linear = memo(Slider_LinearComponent, isEqual)