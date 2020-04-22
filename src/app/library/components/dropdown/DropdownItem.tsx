import React from 'react'
import { StyleSheet, View } from 'react-native'
import { DropItemProps } from './Dropdown.props'
import { Button, Text } from '..'
import { mergeAll, flatten } from 'ramda';
import { stylesItem as styles } from './Dropdown.preset'

export const DropItem = ({ index, item, onPress, customItem, textItemStyle }: DropItemProps) => {
    const _onPress = () => {
        onPress && onPress(item, index);
    }
    const text = mergeAll(flatten([styles.textOption, textItemStyle]));
    return (
        <Button style={[styles.row]} onPress={_onPress} activeOpacity={0.85}>
            {customItem ? customItem(item, index) : <Text style={[text]} text={item.text ?? ''} />}
        </Button>
    )
}



