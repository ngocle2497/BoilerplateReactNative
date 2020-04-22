import React, { useState } from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { FABGroupProps, Actions } from './FABGroup.props'
import { useSafeArea } from 'react-native-safe-area-view'
import { mergeAll, flatten } from 'ramda'
import { Button, Icon } from '../../../'
import {  useSpringTransition } from 'react-native-redash'
import { ButtonGroup } from './ButtonGroup'
export const SIZE_FAB = 60
const styles = StyleSheet.create({
    wrap: {
        minWidth: SIZE_FAB,
        height: SIZE_FAB,
        borderRadius: SIZE_FAB / 2,
        backgroundColor: '#fe00f6',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        zIndex: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    label: {
        color: '#FFFFFF',
        fontWeight: 'normal',
        fontFamily: undefined,
        paddingLeft: 5,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        zIndex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    wrapAction: {
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
})
export const FABGroup = (props: FABGroupProps) => {
    const { style, icon, label, actions = [] } = props;
    const window = useWindowDimensions()
    const [isShow, setIsShow] = useState(false)
    const progress =  useSpringTransition(isShow) 
    const inset = useSafeArea()
    const styleBase = mergeAll(flatten([styles.wrap, { right: inset.right + 15, height: SIZE_FAB, bottom: inset.bottom + 5 }, style]))
    const _show = () => {
        setIsShow(true)
    }
    const _hide = () => {
        setIsShow(false)
    }
    const onStartShouldSetResponder = () => true;
    const onPressItem = (onPressAction: Function) => {
        setIsShow(false)
        onPressAction && onPressAction()
    }
    return (
        <>

            <Button onPress={_show} activeOpacity={0.6} preset={'link'} style={[styleBase]}>
                <Icon icon={icon} />{React.isValidElement(label) ? label : label && <Text style={[styles.label]} text={label} />}
            </Button>
            <View style={[styles.wrapAction, {
                right: inset.right + 25,
                bottom: inset.bottom + SIZE_FAB,
            }]}>
                {actions.map((item: Actions, index: number) => (<ButtonGroup
                    index={index}
                    icon={item.icon}
                    label={item.label}
                    onPressItem={item.onPress}
                    progress={progress}
                    onPress={onPressItem} />))}
            </View>
            {isShow === true && <View onStartShouldSetResponder={onStartShouldSetResponder} onResponderRelease={_hide} style={[styles.background, { width: window.width, height: window.height }]} />}
        </>
    )
}



