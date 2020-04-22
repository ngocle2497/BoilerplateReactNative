import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FAB as FABDefault } from './components/FAB/FAB'
import { FABGroup } from './components/FABGroup/FABGroup'
import { FABProps } from './FAB.props'
const styles = StyleSheet.create({})

export const FAB = (props: FABProps) => {
    const { type = 'default', icon = 'plus', style = {} } = props;
    return type === 'default' ? <FABDefault {...{ ...props, icon, style }} /> : <FABGroup {...{ ...props, icon, style }} />
}



