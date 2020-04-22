import React, { useState, useRef, cloneElement, Children } from 'react'
import { View, Animated, TouchableOpacity } from 'react-native'
import { LightBoxProps } from './LightBox.props'
import { LightBoxOverlay } from './LightBoxOverlay'


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

    const _onOpen = () => {
        _root.current?.measure((ox: number, oy: number, width: number, height: number, px: number, py: number) => {
            setOrigin({
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
                    <TouchableOpacity onPress={_onOpen}>
                        {children && children}
                    </TouchableOpacity>
                </Animated.View>
                <LightBoxOverlay {...getOverlayProps()} />
            </View>
        </>
    )
}


