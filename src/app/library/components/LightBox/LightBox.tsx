import React, { useState, useRef, cloneElement, Children } from 'react'
import { Animated, TouchableOpacity, View, LayoutChangeEvent } from 'react-native'
import { LightBoxProps } from './LightBox.props'
import { LightBoxOverlay } from './LightBoxOverlay'
import { Button } from '../Button/Button'


export const LightBox = (props: LightBoxProps) => {
    const { children, backgroundColor = 'black', renderContent, renderHeader, swipeToDismiss = true } = props;
    const _root = useRef()
    const [layoutOpacity, setlayoutOpacity] = useState(new Animated.Value(1))
    const [isOpen, setIsOpen] = useState(false)
    const [origin, setOrigin] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    })
    const _onLayoutButton = (e: LayoutChangeEvent) => {
        setOrigin({ ...origin, width: e.nativeEvent.layout.width })
        console.log("BU", JSON.stringify(e.nativeEvent.layout))
    }
    const _onOpen = () => {
        _root.current?.measure((ox: number, oy: number, width: number, height: number, px: number, py: number) => {
            setOrigin({
                ...origin,
                width,
                height,
                x: px,
                y: py,
            })
            setIsOpen(true)
            layoutOpacity.setValue(0)
        });
    }
    const _onClose = () => {
        setIsOpen(false)
        layoutOpacity.setValue(1)
    }
    const getContent = () => {
        if (renderContent) {
            return renderContent()
        }
        return cloneElement(
            Children.only(children),
            {}
        );
    }
    const getOverlayProps = () => ({
        isOpen: isOpen,
        origin: origin,
        renderHeader: renderHeader,
        swipeToDismiss: swipeToDismiss,
        backgroundColor: backgroundColor,
        children: getContent(),
        onClose: _onClose,
    })
    return (
        <>
            <View
                ref={_root}
                collapsable={false}
            >
                <Animated.View style={{ opacity: layoutOpacity }}>
                    <Button preset={'link'} onPress={_onOpen}>
                        {children && children}
                    </Button>
                </Animated.View>
                <LightBoxOverlay {...getOverlayProps()} />
            </View>
        </>
    )
}


