import React, { memo } from 'react'
import { SizeBoxProps } from './SizeBox.props'
import { mergeAll, flatten, equals } from 'ramda';
import { Block } from '../Block/Block';

const SizeBoxComponent = (props: SizeBoxProps) => {
    const { children, style = {}, height = 0, width = 0, backgroundColor = 'transparent' } = props;

    const actualStyle = mergeAll(flatten([{ width, height, backgroundColor }, style]));
    return (
        <Block style={actualStyle}>
            {children && children}
        </Block>
    )
}
export const SizeBox = memo(SizeBoxComponent, (prevProps, nextProps) => equals(prevProps, nextProps))