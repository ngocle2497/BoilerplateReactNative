import React, { memo, useMemo, useCallback } from 'react'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import isEqual from 'react-fast-compare'
import { ItemSectionListProps } from './type'
import { styles } from './style';
import { flatten, mergeAll } from 'ramda';
const ItemListComponent = ({ item, onItemPress, index, containerItemStyle = {}, itemTextStyle = {} }: ItemSectionListProps) => {
    
    // press
    const _onItemPress = useCallback(() => {
        onItemPress && onItemPress(item, index);
    }, [item, onItemPress])

    // style
    const containerStyle = useMemo(() => mergeAll(flatten([styles.wrapItem, containerItemStyle])), [containerItemStyle])
    const textStyle = useMemo(() => mergeAll(flatten([styles.itemTextStyle, itemTextStyle])), [itemTextStyle])

    // render
    return (
        <TouchableOpacity activeOpacity={0.67} onPress={_onItemPress}>
            <View style={containerStyle}>
                <Text style={textStyle} numberOfLines={1}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(ItemListComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

