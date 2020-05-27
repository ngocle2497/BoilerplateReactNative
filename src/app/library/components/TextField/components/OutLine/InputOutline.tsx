import React, { useState, useEffect,useMemo } from 'react'
import { StyleSheet, TextInput, LayoutChangeEvent } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import { useTimingTransition } from 'react-native-redash'
import { InputOutlineProps } from './InputOutline.props';
import { useTranslation } from 'react-i18next';
import { enhance } from '@common'


const VERTICAL_PADDING = 10;
const UN_ACTIVE_COLOR = 'rgb(159,152,146)'
const ACTIVE_COLOR = 'rgb(0,87,231)'
const ERROR_COLOR = 'rgb(214,45,32)'

const styles = StyleSheet.create({
    container: {
        paddingVertical: VERTICAL_PADDING,
        borderWidth: 2,
        borderColor: 'gray',
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        position: 'relative',

        alignItems: 'center'
    },
    input: {
        flex: 1,
        width: '100%',
        marginVertical: 5,
        padding:0
    },
    text: {
        position: 'absolute',
        alignSelf: 'flex-start',
        zIndex: 4,
        left: 5,
    },
    wrapLabel: {
        position: 'absolute',
        left: 0
    }
})

export const InputOutline = (props: InputOutlineProps) => {
    const [t] = useTranslation()
    const { defaultValue, label, labelTx, disabledInputColor,
        placeholder,
        onChange,
        placeholderColor,
        placeholderTx,
        inputStyle = {},
        keyName = '',
        errorBorderColor = ERROR_COLOR,
        errorLabelColor = ERROR_COLOR,
        disabledLabelColor = UN_ACTIVE_COLOR,
        activeTintBorderColor = ACTIVE_COLOR,
        activeTintLabelColor = ACTIVE_COLOR,
        unActiveTintBorderColor = UN_ACTIVE_COLOR,
        unActiveTintLabelColor = UN_ACTIVE_COLOR,
        disabledBorderColor = UN_ACTIVE_COLOR,
        disabled = false, error = undefined,
        backgroundLabelColor = '#FFFFFF', ...rest } = props;
    const [sizeContainer, setSizeContainer] = useState({ height: 0 })
    const [restored, setRestored] = useState(false)
    const [sizeText, setSizeText] = useState({ height: 0 })
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    const progress = useTimingTransition(focused || value.length > 0, { duration: 150 })
    const top = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [sizeContainer.height / 2 - sizeText.height / 2 - VERTICAL_PADDING / 4, 0 - sizeText.height / 4 + 3]
    })
    const fontLabel = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [14, 12]
    })
    const labelColor = () => {
        if (disabled) {
            return disabledLabelColor;
        }
        if (Boolean(error)) {
            return errorLabelColor;
        }
        if (focused) {
            return activeTintLabelColor
        }
        return unActiveTintLabelColor;
    }
    const borderColor = () => {
        if (disabled) {
            return disabledBorderColor;
        }
        if (Boolean(error)) {
            return errorBorderColor
        }
        if (focused) {
            return activeTintBorderColor
        }
        return unActiveTintBorderColor;
    }
    const _onLayoutContainer = (e: LayoutChangeEvent) => {
        setSizeContainer({ ...sizeContainer, height: e.nativeEvent.layout.height })
    }
    const onLayoutText = (e: LayoutChangeEvent) => {
        setSizeText({ ...sizeText, height: e.nativeEvent.layout.height })
    }
    const _onFocus = () => {
        setFocused(true)
    }
    const _onBlur = () => {
        setFocused(false)
    }
    const _onChangeText = (text: string) => {
        setValue(text)
        onChange && onChange(text)
    }
    useEffect(() => {
        onChange && onChange(value, keyName)
    }, [value])
    useEffect(() => {
        if (typeof defaultValue === 'string' && !restored) {
            setValue(defaultValue)
            setRestored(true)
        }
    }, [defaultValue])
    const labelText = labelTx && t(labelTx) || label || undefined;
    const inputSty = useMemo(() => enhance([styles.input, inputStyle]), [inputStyle])
    const placeHolder = placeholderTx && t(placeholderTx) || placeholder || '';
    return (
        <Animated.View onLayout={_onLayoutContainer} style={[styles.container, { borderColor: borderColor() }]}>
            <TextInput 
                        defaultValue={defaultValue??''}
                        autoCorrect={false} 
            placeholder={focused === true ? placeHolder : ''}
                editable={!disabled} placeholderTextColor={placeholderColor ?? undefined}
            onChangeText={_onChangeText} onFocus={_onFocus} onBlur={_onBlur} style={inputSty} {...rest} />
            {labelText && <Animated.View pointerEvents={'none'} style={[styles.wrapLabel, { top }]}>
                <Animated.Text onLayout={onLayoutText} style={[styles.text, { color: labelColor(), fontSize: fontLabel }]}>{labelText ?? ''}</Animated.Text>
            </Animated.View>}
        </Animated.View>
    )
}

