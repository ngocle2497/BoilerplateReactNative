import React, { memo } from 'react'
import { DropItemProps } from './Dropdown.props'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import { mergeAll, flatten, equals } from 'ramda';
import { stylesItem as styles } from './Dropdown.preset'

const DropItemComponent = ({ index, item, onPress, customItem, textItemStyle }: DropItemProps) => {
    const _onPress = () => {
        onPress && onPress(item, index);
    }
    const text = mergeAll(flatten([styles.textOption, textItemStyle ?? {}]));
    return (
        <Button style={[styles.row]} onPress={_onPress} activeOpacity={0.85}>
            {customItem ? customItem(item, index) : <Text style={[text]} text={item.text ?? ''} />}
        </Button>
    )
}
export const DropItem = memo(DropItemComponent, (prevProps, nextProps) => equals(prevProps, nextProps))


