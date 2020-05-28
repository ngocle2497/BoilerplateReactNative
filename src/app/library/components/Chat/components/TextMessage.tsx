import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare'
import { TextMessageProps } from '../Chat.props'
import { Block } from '../../Block/Block';
import { Text } from '../../Text/Text';
import { FontSizeDefault } from '@theme/fontSize';

const TextMessageComponent = ({ text }: TextMessageProps) => {
    return (
        <Block>
            <Text {...{ text, style: styles.text }} />
        </Block>
    )
}

export const TextMessage = memo(TextMessageComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: FontSizeDefault.FONT_14
    }
})
