import React, { memo } from 'react'
import { LightBoxOverlay } from './Context'
import isEqual from 'react-fast-compare'
import { LightBoxProps } from './LightBox.props'
import { ChildrenBox } from './ChildrenBox';
const LightBoxComponent = (props: LightBoxProps) => {
    return (
        <LightBoxOverlay>
            <ChildrenBox {...props} />
        </LightBoxOverlay>
    )
}

export const LightBox = memo(LightBoxComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))


