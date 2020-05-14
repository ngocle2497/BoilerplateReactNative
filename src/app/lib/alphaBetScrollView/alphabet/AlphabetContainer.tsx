import React, { memo, useRef, useCallback } from 'react'
import { Text, View, LayoutChangeEvent } from 'react-native'
import isEqual from 'react-fast-compare'
import Animated, { useCode, cond, eq, call, set, modulo, round, floor, Value, not } from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { styles } from '../style';
import { useValues, onGestureEvent } from 'react-native-redash'
import { AlphabetProps } from '../type'
import ItemAlphabet from './ItemAlphabet'

const onGestureHandler = (y: Animated.Value<number>) => onGestureEvent({ y })

const AlphabetContainerComponent = ({ dataTitle = [], selectedAlphaIndex, handlerScroll }: AlphabetProps) => {

    const [y, selected] = useValues([0, 0])
    const height = useRef<number>(0)

    const _onLayout = useCallback((e: LayoutChangeEvent) => { height.current = e.nativeEvent.layout.height }, [dataTitle])

    const _renderItem = ({ title }: { title: string }, index: number) => {
        return <ItemAlphabet title={title} index={index} />
    }
    useCode(() => [
        call([y], ([y]) => {
            const newIndex = Math.floor(y / Math.round(height.current / dataTitle.length))
            if (newIndex <= dataTitle.length - 1 && newIndex >= 0) {

                selected.setValue(newIndex)
            }

        })], [y])
    useCode(() => [
        cond(not(eq(selectedAlphaIndex, selected)), set(selectedAlphaIndex, selected))
    ], [selected])
    return (
        <PanGestureHandler {...onGestureHandler(y)}>
            <Animated.View onLayout={_onLayout} style={styles.containerAlphabet}>
                {dataTitle.map(_renderItem)}
            </Animated.View>
        </PanGestureHandler>
    )
}

export default memo(AlphabetContainerComponent, (prevProps, nextProp) => isEqual(prevProps, nextProp))

