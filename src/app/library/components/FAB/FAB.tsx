import React from 'react'
import { FABDefault } from './components/FABDefault/FABDefault'
import { FABGroup } from './components/FABGroup/FABGroup'
import { FABProps } from './FAB.props'


export const FAB = (props: FABProps) => {
    const { type = 'default', icon = 'plus', style = {} } = props;
    return type === 'default' ? <FABDefault {...{ ...props, icon, style }} /> : <FABGroup {...{ ...props, icon, style }} />
}



