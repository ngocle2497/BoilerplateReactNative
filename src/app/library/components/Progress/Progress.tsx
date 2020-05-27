import React, { memo } from 'react'
import { ProgressCircle } from './components/Circle/ProgressCircle'
import { ProgressLinear } from './components/Linear/ProgressLinear'
import { ProgressProps } from './Progress.props'
import { RADIUS, STROKE_WIDTH, COLOR_BG, COLOR_FG } from './components/Circle/Constant'
import equals from 'react-fast-compare'


const ProgressComponent = (props: ProgressProps) => {
    const { type, strokeWidth = STROKE_WIDTH, textProgressStyle = {}, showTextProgress = true, bg = COLOR_BG, fg = COLOR_FG, radius = RADIUS, progress = 0 } = props
    return (
        type === 'linear' ? <ProgressLinear {...props} /> : <ProgressCircle {...{ progress, textProgressStyle, showTextProgress, bg, fg, radius, strokeWidth }} />
    )
}
export const Progress = memo(ProgressComponent, (prevProps, nextProps) => equals(prevProps, nextProps))