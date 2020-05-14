import React, { memo, useMemo } from 'react'
import { Text, View, ViewStyle, TextStyle } from 'react-native'
import isEquals from 'react-fast-compare'
import Animated, { eq, round, multiply, modulo, interpolate } from 'react-native-reanimated'
import { styles } from './style';
import { withTransition, useValues, toRad } from 'react-native-redash';

interface ItemPickerProps {
    offsetY: Animated.Value<number>;
    itemHeight: number;
    wrapperHeight: number;
    item: string;
}

const ItemPickerComponent = ({ itemHeight, wrapperHeight, offsetY, item }: ItemPickerProps) => {
    // const [h] = useValues([itemHeight])
    const selected = withTransition(eq(multiply(round(modulo(offsetY, itemHeight)), itemHeight), offsetY))
    const containerStyle = useMemo(() => [styles.itemWrapper, { height: itemHeight } as ViewStyle], [itemHeight])
    const itemStyle = [styles.itemText, {
        
    } as TextStyle]
    return (
        <View style={containerStyle}>
            <Animated.Text style={itemStyle} numberOfLines={1}>{item}</Animated.Text>
        </View>
    )
}

export default memo(ItemPickerComponent, (prevProps, nextProps) => isEquals(prevProps, nextProps))


