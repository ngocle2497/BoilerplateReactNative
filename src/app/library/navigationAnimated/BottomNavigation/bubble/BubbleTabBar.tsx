import React, { useMemo, memo } from 'react'
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native'
import { TabBarViewProps } from '../type'
import {
    DEFAULT_ITEM_ANIMATION_DURATION,
    DEFAULT_ITEM_ANIMATION_EASING,
    DEFAULT_ITEM_INNER_SPACE,
    DEFAULT_ITEM_OUTER_SPACE,
    DEFAULT_ITEM_ICON_SIZE
} from './constant';
import { useSafeArea } from 'react-native-safe-area-view';
import { styles } from './style'
import { equals } from 'ramda';
import BubbleTabBarItem from './item/BubbleTabBarItem'
const BubbleTabBarComponent = (props: TabBarViewProps) => {
    const {
        selectedIndex,
        routes,
        duration = DEFAULT_ITEM_ANIMATION_DURATION,
        easing = DEFAULT_ITEM_ANIMATION_EASING,
        itemInnerSpace = DEFAULT_ITEM_INNER_SPACE,
        itemOuterSpace = DEFAULT_ITEM_OUTER_SPACE,
        iconSize = DEFAULT_ITEM_ICON_SIZE,
        style: containerStyleOverride
    } = props;
    const inset = useSafeArea();

    const containerStyle = useMemo<StyleProp<ViewStyle>>(() => [
        styles.container,
        containerStyleOverride, 
        {
            flexDirection:'row',
            paddingBottom: inset.bottom
        }
    ], [inset, containerStyleOverride])
    return (
        <View style={containerStyle}>
            {routes.map(({ key, title,background, ...configs },index) => {
                return <BubbleTabBarItem
                 key={key}
                 index={index}
                 selectedIndex={selectedIndex}
                 label={title}
                 duration={duration}
                 easing={easing}
                 background={background}
                 itemInnerSpace={itemInnerSpace}
                 itemOuterSpace={itemOuterSpace}
                 iconSize={iconSize}
                 {...configs} />
            })}
        </View>
    )
}
const BubbleTabBar = memo(BubbleTabBarComponent, (prevProps, nextProps) => equals(prevProps, nextProps));
export default BubbleTabBar;