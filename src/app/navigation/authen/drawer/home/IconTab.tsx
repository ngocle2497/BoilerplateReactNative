import React from 'react'
import { StyleSheet, Text, View, ImageStyle } from 'react-native'
import { IconTypes } from '../../../../assets/icon'
import { icons } from '../../../../assets/icon/'
import Animated from 'react-native-reanimated'
import { Icon } from '../../../../library/components'

interface IconTabProps {
    icon: IconTypes;
    size: number;
    color: Animated.Node<string | number>;
    colorTintIcon: Animated.Node<string | number>;
}

const IconTab = (props: IconTabProps) => {
    const { icon, color, colorTintIcon } = props;
    const styleIcon = [{  tintColor: colorTintIcon }]
    return (
        <Animated.Image style={styleIcon} source={icons[icon ?? 'close']} />
    )
}

export default IconTab
