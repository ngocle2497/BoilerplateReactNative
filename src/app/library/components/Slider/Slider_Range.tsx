import { between, clamp, timing, usePanGestureHandler, withOffset } from '@animated'
import React, { memo, useCallback, useState } from 'react'
import isEqual from 'react-fast-compare'
import { View, LayoutChangeEvent, StyleSheet } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { abs, add, and, call,  max, min,cond, divide, eq, multiply, onChange, set, sub, useCode, useValue, Value } from 'react-native-reanimated'
import { Text } from '../Text/Text'
import { ACTIVE_COLOR, HEIGHT_SLIDER, INITIAL_RANGE, IN_ACTIVE_COLOR, LOWER_BOUND, THUMB_SIZE, UPPER_BOUND } from './constants'
import { SliderProps } from './type'
import { onCheckType } from '@common'

const styles = StyleSheet.create({
    root: {
        width: '100%',
        paddingVertical: THUMB_SIZE
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
        // position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: ACTIVE_COLOR,
    },
    wrapValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: THUMB_SIZE
    }
})


const Slider_RangeComponent = ({ isShowRange = true, lowerBound = LOWER_BOUND, upperBound = UPPER_BOUND, initialRange = INITIAL_RANGE, onChangeRange }: Omit<SliderProps, 'type'>) => {
    if (lowerBound >= upperBound) {
        throw Error("lowerBound must be less than upperBound")
    }
    const [width, setWidth] = useState<number>(0)
    const offsetThumb1 = useValue(0)
    const offsetThumb2 = useValue(0)
    const initialTranslateTrack1X = useValue(-THUMB_SIZE)
    const initialTranslateTrack2X = useValue(-THUMB_SIZE)

    const { gestureHandler: gestureThumb1, state: stateThumb1, translation: translationThumb1, } = usePanGestureHandler()
    const { gestureHandler: gestureThumb2, state: stateThumb2, translation: translationThumb2, } = usePanGestureHandler()

    const translateThumb1X = cond(eq(stateThumb1, State.UNDETERMINED),
        initialTranslateTrack1X,
        clamp(withOffset(translationThumb1.x, stateThumb1, offsetThumb1), -THUMB_SIZE, width - THUMB_SIZE))

    const translateThumb2X = cond(eq(stateThumb2, State.UNDETERMINED),
        initialTranslateTrack2X,
        clamp(withOffset(translationThumb2.x, stateThumb2, offsetThumb2), -THUMB_SIZE, width - THUMB_SIZE))

    const leftThumb1 = sub( translateThumb1X, THUMB_SIZE)
    const leftThumb2 = sub(translateThumb2X, THUMB_SIZE)
    const leftTrack = min(leftThumb2, leftThumb1)
    const rightTrack = divide(sub(width, leftTrack), 1)

    const _onLayout = useCallback(({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
        setWidth(width)
    }, [])

    useCode(() => [
        call([leftTrack], (arg) => {
            console.log("leftTrack",arg[0])
        })
    ], [leftTrack,])
    // useCode(() => [
    //     call([leftThumb1], (arg) => {
    //         console.log("leftThumb1", arg[0])
    //     })
    // ], [leftThumb1])
    // useCode(() => [
    //     call([leftThumb2], (arg) => {
    //         console.log("leftThumb2", arg[0])
    //     })
    // ], [leftThumb2])

    // useCode(() => onChange(translateX, [
    //     call([multiply(divide(add(translateX, THUMB_SIZE), width), abs(sub(upperBound, lowerBound)))], (arg) => {
    //         if (onChangeLinear && onCheckType(onChangeLinear, 'function')) {
    //             onChangeLinear(parseFloat(parseFloat(String(arg[0])).toFixed(1)))
    //         }
    //     })
    // ]), [translateX])

    useCode(() => [
        cond(
            and(
                eq(stateThumb1, State.UNDETERMINED),
                eq(stateThumb2, State.UNDETERMINED),
                eq(between(initialRange[0], lowerBound, upperBound), 1),
                eq(between(initialRange[1], lowerBound, upperBound), 1)
            ),
            [
                set(offsetThumb1, sub(multiply(width, divide(initialRange[0], upperBound)), THUMB_SIZE)),
                set(offsetThumb2, sub(multiply(width, divide(initialRange[1], upperBound)), THUMB_SIZE)),
                set(initialTranslateTrack1X, timing({ from: initialTranslateTrack1X, to: sub(multiply(width, divide(initialRange[0], upperBound)), THUMB_SIZE) })),
                set(initialTranslateTrack2X, timing({ from: initialTranslateTrack2X, to: sub(multiply(width, divide(initialRange[1], upperBound)), THUMB_SIZE) }))
            ]
        )
    ], [width, stateThumb1, stateThumb2])

    return (
        <View onLayout={_onLayout} style={[styles.root]}>
                {/* <Animated.View pointerEvents={'none'} style={[styles.track,{zIndex:-1}]} /> */}
            <View style={[styles.container]}>
                <PanGestureHandler {...gestureThumb1}>
                    <Animated.View style={[styles.thumb, { transform: [{ translateX: translateThumb1X }] }]} />
                </PanGestureHandler>
                <PanGestureHandler {...gestureThumb2}>
                    <Animated.View style={[styles.thumb, { transform: [{ translateX: translateThumb2X }] }]} />
                </PanGestureHandler>
            </View>
            {isShowRange &&
                <View style={[styles.wrapValue]}>
                    <Text>{lowerBound}</Text>
                    <Text>{upperBound}</Text>
                </View>
            }
        </View>
    )
}

export const Slider_Range = memo(Slider_RangeComponent, isEqual)