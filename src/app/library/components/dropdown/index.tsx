import React, { useState, useRef } from 'react'
import { View, FlatList, LayoutChangeEvent } from 'react-native'
import { DropdownProps, DropdownOption } from './dropdown.props'
import { Button, Text } from '../'
import { DropItem } from './dropdown.item'
import Animated from 'react-native-reanimated'
import { translate } from '../../utils'
import Modal from 'react-native-modal'
import { styles } from './dropdown.preset'
import { useSafeArea } from 'react-native-safe-area-view'

export const Dropdown = (props: DropdownProps) => {
    const inset = useSafeArea()
    const { onPress, textStyle, buttonStyle, textItemStyle, rightChildren, defaultSelect = translate('dialog:select'), backDropColor = 'rgba(0,0,0,.5)', customItem = undefined, data = [], ...rest } = props;
    const [selectedText, setSelectedText] = useState(defaultSelect)
    const [visible, setVisible] = useState(false)
    const onPressOption = (item: DropdownOption, index: number) => {
        setVisible(false)
        setSelectedText(item.text)
        onPress && onPress(item, index)
    }
    const _showDrop = () => {
        setVisible(true)
    }
    const _hideDrop = () => {
        setVisible(false)
    }
    const _renderItem = ({ item, index }: { item: DropdownOption, index: number }) => {
        return <DropItem key={item.text} onPress={onPressOption} item={item} index={index} />
    }
    const _keyExtractor = (item: DropdownOption, index: number) => item.text;
    return (
        <>
            <View style={[styles.root]} collapsable={false}>
                <Button onPress={_showDrop} activeOpacity={0.68} preset={'link'} style={[styles.buttonDrop]}>
                    <View style={[styles.row]}>
                        <Text style={[]} text={selectedText} />
                        {rightChildren && rightChildren}
                    </View>
                </Button>
                <Modal onBackdropPress={_hideDrop} style={[styles.modal]} useNativeDriver={true} isVisible={visible} >
                    <View style={[styles.wrap]}>
                        <View style={[styles.wrapList, { paddingBottom: inset.bottom }]}>
                            <FlatList data={data} keyExtractor={_keyExtractor} renderItem={_renderItem} />
                        </View>
                    </View>
                </Modal>
            </View>

        </>
    )
}


