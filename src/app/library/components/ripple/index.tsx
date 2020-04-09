import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, LayoutChangeEvent, ViewStyle, I18nManager, GestureResponderEvent } from 'react-native'
import { RippleProps } from './ripple.props'
import Animated, { Clock, set, Easing, useCode, block, cond, not, clockRunning, call, interpolate } from 'react-native-reanimated'
import { timing, useTimingTransition, useValues, loop } from 'react-native-redash';
import { DotRipple } from './dotRipple';
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

        backgroundColor: 'transparent',
        overflow: 'hidden',
        elevation: 3,
    }
})

export interface DotRippleProps {
    progress: Animated.Value<number>;
    locationX: number;
    locationY: number;
    unique: any;
    R: number;
}
let mUnique = 0;

export const Ripple = (props: RippleProps) => {
    const { children, onLayout, ...rest } = props;
    const [sizeDefault, setSizeDefault] = useState({ width: 0, height: 0 })
    const [dotRipple, setDotRipple] = useState<Array<DotRippleProps>>([])
    const [refresh, setRefresh] = useState(false)
    const [eleProgress] = useValues([0], [])
    const clock = new Clock()
    const elevation = interpolate(eleProgress, { inputRange: [0, 1], outputRange: [0, 4] })
    const _onLayout = (e: LayoutChangeEvent) => {
        const { height, width } = e.nativeEvent.layout
        setSizeDefault({ ...sizeDefault, width: width, height: height })
        onLayout && onLayout()
    }
    const _onEndRippleAnimated = () => {
        setDotRipple(dotRipple.slice(1))
    }
    const _renderRipple = (item: DotRippleProps) => {
        return <DotRipple dot={item} rippleColor={props.rippleColor} key={item.unique} callBack={_onEndRippleAnimated} />
    }
    const _onPress = (e: GestureResponderEvent) => {
        if (!dotRipple.length) {
            _startRipple(e)
        }
    }
    const _onLongPress = (e: GestureResponderEvent) => {
        if (!dotRipple.length) {
            _startRipple(e)
        }
    }
    const _startRipple = (e: GestureResponderEvent) => {
        const {
            rippleCentered = false,
            rippleSize = 0 } = props;
        let w2 = 0.5 * sizeDefault.width;
        let h2 = 0.5 * sizeDefault.height;
        let { locationX, locationY } = rippleCentered ?
            { locationX: w2, locationY: h2 } :
            e.nativeEvent;
        let offsetX = Math.abs(w2 - locationX);
        let offsetY = Math.abs(h2 - locationY);
        let R = rippleSize > 0 ?
            0.5 * rippleSize :
            Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));
        let ripple = {
            unique: mUnique++,
            progress: new Animated.Value(0),
            locationX,
            locationY,
            R,
        };
        // onRippleAnimation(ripple.progress, _onEndRippleAnimated);
        setDotRipple(dotRipple.concat(ripple))

    }
    useEffect(() => {
        dotRipple.length > 0 && setRefresh(!refresh)
        return () => {

        }
    }, [dotRipple])
    return (
        <TouchableWithoutFeedback onLayout={_onLayout} onLongPress={_onLongPress} onPress={_onPress} {...rest}>
            <Animated.View pointerEvents={'box-only'}>
                {children}
                <View style={[styles.container]}>
                    {dotRipple.map(_renderRipple)}
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}


