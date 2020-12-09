import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Slider_Linear } from './Slider_Linear'
import { Slider_Range } from './Slider_Range'
import { SliderProps } from './type'

const SliderComponent = (props: SliderProps) => {
    return props.type === 'range' ? <Slider_Range {...props} /> : <Slider_Linear {...props} />
}

export const Slider = memo(SliderComponent, isEqual)