import React from 'react'
import { timing, useTimingTransition } from "@animated"
import { memo, useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import Animated, { Easing, set, useCode, useValue } from "react-native-reanimated"
import { DURATION_ANIMATED, BG_ERROR, BG_INFO, BG_SUCCESS, BG_WARN } from "./constants"
import { SnackBarItemProps, TypeMessage } from './type'


const styles = StyleSheet.create({
    itemBar: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        marginHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row',
        borderLeftWidth: 3,
        borderLeftColor: BG_SUCCESS,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    text: {
        flex: 1
    }
})

const getColor = (typeMessage: TypeMessage, borderLeftColor: Omit<SnackBarItemProps, 'item' | 'onPop'>): string => {
    const { borderLeftColorError, borderLeftColorInfo, borderLeftColorSuccess, borderLeftColorWarn } = borderLeftColor
    switch (typeMessage) {
        case 'success':
            return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
        case 'info':
            return borderLeftColorInfo ? borderLeftColorInfo : BG_INFO;
        case 'warn':
            return borderLeftColorWarn ? borderLeftColorWarn : BG_WARN;
        case 'error':
            return borderLeftColorError ? borderLeftColorError : BG_ERROR;
        default:
            return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
    }
}

export const SnackItem = memo(({ item, onPop, borderLeftColorError, borderLeftColorInfo, borderLeftColorSuccess, borderLeftColorWarn }: SnackBarItemProps) => {
    const [isShow, setIsShow] = useState<boolean>(true)
    const opacity = useTimingTransition(isShow, { duration: DURATION_ANIMATED })
    const translateY = useValue(-150)
    const translateX = useValue(0)
    const _onClose = useCallback(() => { setIsShow(false) }, [])
    useEffect(() => {
        const id = setTimeout(() => {
            setIsShow(false)
        }, item.interval + DURATION_ANIMATED)

        return () => {
            clearTimeout(id)
        }
    }, [])
    useEffect(() => {
        let id: NodeJS.Timeout | null = null
        if (!isShow) {
            id = setTimeout(() => {
                onPop(item)
            }, DURATION_ANIMATED)
        }
        return () => {
            if (id) {
                clearTimeout(id)
            }
        }
    }, [isShow])
    useCode(() => isShow ? [
        set(translateY, timing({ to: 0, from: translateY, duration: DURATION_ANIMATED, easing: Easing.inOut(Easing.ease) }))
    ] : [
            set(translateX, timing({ to: -999, from: translateX, duration: DURATION_ANIMATED, easing: Easing.inOut(Easing.ease) }))
        ], [isShow])
    return (
        <Animated.View style={[styles.itemBar, { opacity, borderLeftColor: getColor(item.type, { borderLeftColorError, borderLeftColorInfo, borderLeftColorSuccess, borderLeftColorWarn }), transform: [{ translateY }, { translateX }] }]}>
            <Text style={[styles.text]}>{item.msg}</Text>
            <Animated.View style={{ opacity }}>
                <TouchableOpacity onPress={_onClose}>
                    <Text>X</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )
}, () => true)