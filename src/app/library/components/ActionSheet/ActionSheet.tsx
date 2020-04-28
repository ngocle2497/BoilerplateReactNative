import React, { useState, forwardRef, useImperativeHandle, memo } from 'react'
import { View, LayoutChangeEvent, useWindowDimensions } from 'react-native'
import { ActionSheetProps, OptionData } from './ActionSheet.props'
import { Text, Button, Block } from '..'
import { useTimingTransition, onGestureEvent, useValues } from 'react-native-redash'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { interpolate, useCode, onChange, cond, eq, call } from 'react-native-reanimated'
import { mergeAll, flatten, equals } from 'ramda';
import { styles } from './ActionSheet.presets'
import { useTranslation } from 'react-i18next'


const enhance = (style: any, styleOverride?: any) => {
    return mergeAll(flatten([style, styleOverride]));
};

const ActionSheetComponent = forwardRef((props: ActionSheetProps, ref) => {
    const [t] = useTranslation()
    const { onPressCancel, textCancelStyle, rootStyle, wrapCancelStyle, textOptionStyle, wrapOptionStyle,
        title, onPressOption, onBackDropPress, textCancel = t('dialog:cancel'),
        backDropColor = 'rgba(0,0,0,.5)', closeOnBackDrop = false, option = [] } = props;
    const [actionVisible, setActionVisible] = useState(false)
    useImperativeHandle(ref, () => ({
        show: () => {
            setActionVisible(true)
        },
        hide: () => {
            setActionVisible(false)
        }
    }))
    const [sizeView, setSizeView] = useState({ height: 0 })
    const { width, height } = useWindowDimensions()
    const _onLayout = (e: LayoutChangeEvent) => {
        setSizeView({ height: e.nativeEvent.layout.height })
    }

    const [state, translationY, translationX] = useValues([State.UNDETERMINED, 0, 0], []);
    const _onGestureHandler = onGestureEvent({ state, translationY, translationX })
    const progress = useTimingTransition(actionVisible);
    const translateY = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [sizeView.height, 0]
    })
    const opacity = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    const _onPress = (item: OptionData, index: number) => {
        return (e: any) => {
            setActionVisible(false)
            onPressOption && onPressOption(item, index)
        }
    }
    const _onCancel = () => {
        onPressCancel && onPressCancel();
        setActionVisible(false)
    }
    useCode(() => onChange(state, [
        cond(eq(state, State.END), call([], ([]) => {
            if (!closeOnBackDrop) {
                setActionVisible(false)
            }
            onBackDropPress && onBackDropPress()
        }))
    ]), [])

    const textOption = enhance(textOptionStyle)
    const textCancelS = enhance(styles.textCancel, textCancelStyle)
    const wrapOption = enhance(styles.wrapOption, wrapOptionStyle)
    const wrapCancel = enhance(styles.wrapCancel, wrapCancelStyle)
    const root = enhance(styles.wrap, rootStyle)
    return (
        <>
            <TapGestureHandler {..._onGestureHandler} enabled={actionVisible}>
                <Animated.View pointerEvents={actionVisible ? 'auto' : 'none'} style={[styles.backDrop, { backgroundColor: backDropColor, width: width, height: height, opacity }]} />
            </TapGestureHandler>
            <Animated.View onLayout={_onLayout} style={[root, { transform: [{ translateY }], opacity }]}>
                <Block style={wrapOption}>
                    {title && (
                        React.isValidElement(title) ? title :
                            <Block style={[styles.wrapTitle]}>
                                <Text style={[styles.title]} text={title} />
                            </Block>)}
                    {option.map((item: OptionData, index: number) => {
                        return (
                            <Button style={[styles.option]} onPress={_onPress(item, index)} key={index}>
                                <Text style={textOption} text={item.text} />
                            </Button>
                        )
                    })}
                </Block>
                <View style={wrapCancel}>
                    <Button onPress={_onCancel} style={[styles.buttonCancel]}>
                        <Text style={textCancelS} text={textCancel} />
                    </Button>
                </View>
            </Animated.View>
        </>
    )
})
export const ActionSheet = memo(ActionSheetComponent, (prevProps, nextProps) => equals(prevProps, nextProps))

