import React, { useState } from 'react'
import { StyleSheet, View, FlatList, LayoutChangeEvent, useWindowDimensions, ViewStyle } from 'react-native'
import { DropdownProps, DropdownOption } from './dropdown.props'
import { useTimingTransition, transformOrigin, useValues, onGestureEvent } from 'react-native-redash'
import { Button, Text } from '../'
import { DropItem } from './dropdown.item'
import Animated, { interpolate, useCode, cond, eq, call, onChange } from 'react-native-reanimated'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import { translate } from '../../utils'
import { mergeAll, flatten } from 'ramda';
import { styles, MAX_HEIGHT } from './dropdown.preset'

export const Dropdown = (props: DropdownProps) => {
    const { onPress, textStyle, buttonStyle, textItemStyle, rightChildren, defaultSelect = translate('dialog:select'), backDropColor = 'rgba(0,0,0,.5)', customItem = undefined, data = [], ...rest } = props;
    const { height: HEIGHT, width } = useWindowDimensions()
    const [selectedText, setSelectedText] = useState(defaultSelect)
    const [sizeButton, setOnSizeButton] = useState({ height: 0, y: 0 })
    const [visible, setVisible] = useState(false)
    const [state, translationY, translationX] = useValues([State.UNDETERMINED, 0, 0], []);
    const _onGestureHandler = onGestureEvent({ state, translationY, translationX })

    const _onLayoutButton = (e: LayoutChangeEvent) => {
        setOnSizeButton({ ...sizeButton, height: e.nativeEvent.layout.height })
    }
    const _onLayoutButtonView = (e: LayoutChangeEvent) => {
        setOnSizeButton({ ...sizeButton, y: e.nativeEvent.layout.y })
    }
    const onPressOption = (item: DropdownOption, index: number) => {
        setVisible(false)
        setSelectedText(item.text)
        onPress && onPress(item, index)
    }
    const _renderItem = ({ item, index }: { item: DropdownOption, index: number }) => {
        return <DropItem textItemStyle={textItemStyle} customItem={customItem} item={item} index={index} onPress={onPressOption} />
    }
    const _keyExtractor = (item: DropdownOption, index: number): string => item.text.toString()
    const _toggleVisible = () => {
        setVisible(!visible)
    }
    const progress = useTimingTransition(visible);
    const positionFlat = () => {
        if (sizeButton.y + sizeButton.height + MAX_HEIGHT >= HEIGHT - 80) {
            return {
                bottom: sizeButton.height,
            }
        }
        else {
            return {
                top: sizeButton.height,
            }
        }
    }
    const height = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, MAX_HEIGHT]
    })
    const text = mergeAll(flatten([styles.text, textStyle]));
    const button = mergeAll(flatten([styles.buttonDrop, buttonStyle]));

    useCode(() => onChange(state, [
        cond(eq(state, State.END), call([], ([]) => {
            setVisible(false)
        }))
    ]), [])
    return (
        <>
            <View style={[styles.root]} onLayout={_onLayoutButtonView}>
                <Button onLayout={_onLayoutButton} onPress={_toggleVisible} activeOpacity={0.68} preset={'link'} style={[button]}>
                    <View style={[styles.row]}>
                        <Text style={[text]} text={selectedText} />
                        {rightChildren && rightChildren}
                    </View>
                </Button>
                <Animated.View style={[styles.wrapList, { height }, positionFlat()]}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={_keyExtractor}
                        {...rest}
                        renderItem={_renderItem} />
                </Animated.View>
            </View>
            <TapGestureHandler {..._onGestureHandler} enabled={visible}>
                <Animated.View pointerEvents={visible ? 'auto' : 'none'} style={[styles.backDrop, {
                    backgroundColor: backDropColor,
                    bottom: - sizeButton.height, width: width, height: HEIGHT
                }]} />
            </TapGestureHandler>
        </>
    )
}


