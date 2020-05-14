import React, { memo, useMemo, useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ViewStyle, NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native'
import isEquals from 'react-fast-compare'
import { Block } from '../../library/components'
import { styles } from './style';
import { onScrollEvent, useValues } from 'react-native-redash';
import Animated from 'react-native-reanimated'
import ItemPicker from './ItemPicker';
import { WheelPickerProps } from './type';

import { DEFAULT_HIGHT_LIGHT_LINE_COLOR, DEFAULT_ITEM_HEIGHT, DEFAULT_PLACE_HOLDER_COLOR, DEFAULT_WRAPPER_HEIGHT } from './constant';



const WheelPickerComponent = ({
    data,
    renderItem,
    onValueChange,
    hightLightLineColor = DEFAULT_HIGHT_LIGHT_LINE_COLOR,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    placeHolderColor = DEFAULT_PLACE_HOLDER_COLOR,
    wrapperHeight = DEFAULT_WRAPPER_HEIGHT,
}: WheelPickerProps) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const _scrollView = useRef<Animated.ScrollView>(null)
    const [offsetY] = useValues([0])
    const wrapperStyle = useMemo(() => ({
        height: wrapperHeight,
        width: '100%',
        backgroundColor: '#fafafa',
        overflow: 'hidden',
    } as ViewStyle), [])

    const placeHolerTopStyle = useMemo(() => ([
        {
            width: '100%',
            height: (wrapperHeight - itemHeight) / 2,
            backgroundColor: placeHolderColor,
            position: 'absolute',
            top: 0
        }
    ] as ViewStyle), [wrapperHeight, itemHeight, placeHolderColor])

    const placeHolerBottomStyle = useMemo(() => ([
        {
            width: '100%',
            height: (wrapperHeight - itemHeight) / 2,
            backgroundColor: placeHolderColor,
            position: 'absolute',
            bottom: 0
        }] as ViewStyle), [wrapperHeight, itemHeight, placeHolderColor])

    const hightLightStyle = useMemo(() => ({
        position: 'absolute',
        top: (wrapperHeight - itemHeight) / 2,
        height: itemHeight,
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: hightLightLineColor,
        borderBottomColor: hightLightLineColor,

    } as ViewStyle), [hightLightLineColor, wrapperHeight, itemHeight,])

    const verticalViewStyle = useMemo(() => ({
        height: (wrapperHeight - itemHeight) / 2,
        flex: 1,
    }) as ViewStyle, [wrapperHeight, itemHeight])

    const _renderItem = (item: any, index: number) => {
        if (renderItem) {
            return renderItem
        }
        return (
            <ItemPicker key={index} wrapperHeight={wrapperHeight} item={item} itemHeight={itemHeight} offsetY={offsetY} />
        );
    }
    const _onScrollFix = (e: any) => {
        let y = 0;
        let h = itemHeight;
        if (e.nativeEvent.contentOffset) {
            y = e.nativeEvent.contentOffset.y;
        }
        let selected = Math.round(y / h);
        let _y = selected * h;
        if (_y !== y) {

            _scrollView.current?.getNode().scrollTo({ y: _y });
        }
        if (selectedIndex === selected) {
            return;
        }
        // setSelectedIndex(selected)
        // // onValueChange
        // if (this.props.onValueChange) {
        //     let selectedValue = this.props.dataSource[selectedIndex];
        //     this.setState({
        //         selectedIndex: selectedIndex,
        //     });
        //     this.props.onValueChange(selectedValue, selectedIndex);
        // }
    }

    const _onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {

        let _e = {
            nativeEvent: {
                contentOffset: {
                    y: e.nativeEvent.contentOffset.y,
                },
            },
        };
        _onScrollFix(_e);

    }
    return (
        <Block style={wrapperStyle}>
            <Block style={hightLightStyle} />

            <Animated.ScrollView
                ref={_scrollView}
                bounces={false}
                onScroll={onScrollEvent({ y: offsetY })}
                overScrollMode={'never'}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={_onMomentumScrollEnd}
            >
                <Block style={verticalViewStyle} />
                {data.map(_renderItem)}
                <Block style={verticalViewStyle} />
            </Animated.ScrollView>
            <Block pointerEvents={'none'} style={placeHolerTopStyle} />
            <Block pointerEvents={'none'} style={placeHolerBottomStyle} />
        </Block>
    )
}

export const WheelPicker = memo(WheelPickerComponent, (prevProps, nextProps) => isEquals(prevProps, nextProps))

