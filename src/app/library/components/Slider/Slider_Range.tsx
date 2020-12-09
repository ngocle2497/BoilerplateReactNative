import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { View, Text } from 'react-native'
import { SliderProps } from './type'

const Slider_RangeComponent = ({ }: Omit<SliderProps, 'type'>) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export const Slider_Range = memo(Slider_RangeComponent, isEqual)