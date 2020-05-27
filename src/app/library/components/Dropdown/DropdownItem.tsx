import React, { memo, useMemo } from 'react'
import { DropItemProps } from './Dropdown.props'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import { enhance } from '@common'
import equals from 'react-fast-compare'
import { stylesItem as styles } from './Dropdown.preset'

const DropItemComponent = ({ index, item, onPress, customItem, textItemStyle }: DropItemProps) => {
    const _onPress = () => {
        onPress && onPress(item, index);
    }
    const text = useMemo(() => enhance([styles.textOption, textItemStyle ?? {}]), [textItemStyle]);
    return (
        <Button style={[styles.row]} onPress={_onPress} activeOpacity={0.85}>
            {customItem ? customItem(item, index) : <Text style={[text]} text={item.text ?? ''} />}
        </Button>
    )
}
export const DropItem = memo(DropItemComponent, (prevProps, nextProps) => equals(prevProps, nextProps))


