import React, { memo, forwardRef, useState, useCallback, useMemo, useEffect } from 'react'
import { StyleSheet, StyleProp, ViewStyle, Platform, LayoutChangeEvent, FlatList, useWindowDimensions, StatusBar } from 'react-native'
import isEqual from 'react-fast-compare'
import { DropDownProps, RowDropDown } from './DropDown.props'
import { Block } from '../Block/Block'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import { Icon } from '../Icon/Icon'
import Animated, { interpolate } from 'react-native-reanimated'
import { useTimingTransition, toRad } from 'react-native-redash'
import { enhance } from '@common'
import Modal from 'react-native-modal'
import { DropDownItem } from './DropDownItem'
import { useSafeArea } from 'react-native-safe-area-view'


const styles = StyleSheet.create({
    placeHolder: {
        flex: 1,
        paddingRight: 5
    },
    wrapView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    wrapViewBottomOpened: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomColor: '#bbb'
    },
    wrapViewTopOpened: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopColor: '#bbb'
    },
    dropStyle: {
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        minHeight: 50,
        maxHeight: 250,
        paddingHorizontal: 10,
    },
    dropTopOpened: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    dropBottomOpened: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    wrapPlaceholder: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    modal: {
        marginHorizontal: 0,
        marginVertical: 0
    }
})

const DropDownComponent = forwardRef((props: DropDownProps, ref) => {
    const { height: deviceH } = useWindowDimensions()
    const inset = useSafeArea()
    const { data, defaultValue, style, containerStyleItem, customTickIcon, activeItemStyle, activeLabelStyle, renderArrow, placeholderStyle, containerStyle, dropDownStyle, placeHolder = 'Select an item', multiple = false, multipleText = '%d items have been selected' } = props;
    const [isVisible, setIsVisible] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | Array<string>>('')
    const [viewLayout, setViewLayout] = useState({ width: 0, height: 0, x: 0, y: 0 })
    const [dropHeight, setDropHeight] = useState(0)
    // function
    const onPressItem = useCallback((value: string) => {
        if (multiple && Array.isArray(selectedValue)) {
            const item = selectedValue.find(x => x === value);
            if (item) {
                setSelectedValue(selectedValue.filter(x => x !== value))
            }
            else {
                setSelectedValue(selectedValue.concat(value))
            }
        } else {
            setSelectedValue(value)
        }
        setIsVisible(false)
    }, [selectedValue, data])

    const _onCheckSelected = useCallback((item: RowDropDown): boolean => {
        if (multiple && Array.isArray(selectedValue)) {
            const itemSelect = selectedValue.find(x => x === item.value);
            return itemSelect !== undefined;
        } else {
            return selectedValue === item.value
        }
    }, [data, selectedValue])

    const _renderItem = ({ item, index }: { item: RowDropDown, index: number }) => {
        return <DropDownItem {...{ item, onPressItem, activeItemStyle, containerStyleItem, activeLabelStyle, customTickIcon, selected: _onCheckSelected(item) }} />
    }

    const _keyExtractor = (item: RowDropDown, index: number) => item.value;

    const _onLayout = useCallback((e: LayoutChangeEvent) => {
        const { height, width, x, y } = e.nativeEvent.layout;
        setViewLayout({ height, width, x, y })
    }, [])

    const _onLayoutDrop = useCallback((e: LayoutChangeEvent) => {
        const { height: DropH } = e.nativeEvent.layout;
        setDropHeight(DropH)
    }, [])

    const _onCheckRenderBottom = useCallback((): boolean => {
        let statusbarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : inset.top;
        return deviceH - (viewLayout.y + statusbarHeight + viewLayout.height) > dropHeight + 50;
    }, [deviceH, viewLayout, dropHeight, inset])

    const _onToggle = useCallback(() => {
        setIsVisible(val => !val)
    }, [])

    const _onHideDrop = useCallback(() => {
        setIsVisible(false)
    }, [])

    const getTextPlaceHolder = useCallback((): string => {
        if (multiple) {
            if (selectedValue.length <= 0) {
                return placeHolder;
            }
            if (selectedValue.length === 1) {
                const item = data.find(x => x.value === selectedValue[0])
                if (item) {
                    return item.label;
                }
                return placeHolder;
            }
            return multipleText.replace("%d", selectedValue.length + "")
        } else {
            if (selectedValue.length <= 0) {
                return placeHolder;
            }
            const item = data.find(x => x.value === selectedValue)
            if (item) {
                return item.label;
            }
            return placeHolder;
        }
    }, [selectedValue, placeHolder, multipleText, multiple]);

    // animated
    const progress = useTimingTransition(isVisible)
    const rotate = toRad(interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, -180]
    }))

    // effect
    useEffect(() => {
        if (typeof defaultValue === 'string') {
            setSelectedValue(defaultValue)
        } else if (Array.isArray(defaultValue) && defaultValue.every(x => typeof x === 'string')) {
            setSelectedValue(defaultValue)
        } else {
            setSelectedValue(multiple ? [] : '')
        }
    }, [defaultValue])
    // style
    const wrapStyle = useMemo(() => enhance([styles.wrapView, isVisible && (_onCheckRenderBottom() ? styles.wrapViewBottomOpened : styles.wrapViewTopOpened), style]) as StyleProp<ViewStyle>, [style, isVisible, deviceH, inset])
    const container = useMemo(() => enhance([styles.wrapPlaceholder, containerStyle]) as StyleProp<ViewStyle>, [containerStyle])
    const textPlaceHolderStyle = useMemo(() => enhance([styles.placeHolder, placeholderStyle]) as StyleProp<ViewStyle>, [placeholderStyle])
    const contentModalStyle = useMemo(() => enhance([styles.dropStyle, dropDownStyle,
    _onCheckRenderBottom() ? styles.dropBottomOpened : styles.dropTopOpened,
    { width: viewLayout.width, left: viewLayout.x, },
    _onCheckRenderBottom() ? { top: viewLayout.y + viewLayout.height }
        : { bottom: deviceH - viewLayout.y - (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : inset.top) }
    ]) as StyleProp<ViewStyle>, [viewLayout, deviceH, inset])

    // render
    return (
        <>
            <Block width={'100%'} onLayout={_onLayout} style={wrapStyle}>
                <Button preset={'link'} onPress={_onToggle}>
                    <Block style={container} direction={'row'}>
                        <Text style={textPlaceHolderStyle} numberOfLines={1}>{getTextPlaceHolder()}</Text>
                        {renderArrow ? renderArrow(progress) : <Animated.View style={[{ transform: [{ rotate: rotate }] }]}>
                            <Icon icon={'arrow_down'} />
                        </Animated.View>}
                    </Block>
                </Button>
            </Block>
            <Modal
                backdropOpacity={0}
                useNativeDriver={true}
                animationInTiming={100}
                animationOutTiming={100}
                onBackButtonPress={_onHideDrop}
                onBackdropPress={_onHideDrop}
                removeClippedSubviews={true}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                style={[styles.modal]}
                isVisible={isVisible}>
                <Block onLayout={_onLayoutDrop} style={contentModalStyle}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={_keyExtractor}
                        renderItem={_renderItem} />
                </Block>
            </Modal>
        </>
    )
})

export const DropDown = memo(DropDownComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))


