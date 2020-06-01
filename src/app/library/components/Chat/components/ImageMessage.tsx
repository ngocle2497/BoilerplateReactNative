import React, { memo } from 'react'
import { StyleSheet, Image } from 'react-native'
import isEqual from 'react-fast-compare'
import { ImageMessageProps } from '../Chat.props'
import { scale } from '@common'
import { LightBox } from '../../LightBox/LightBox'

const ImageMessageComponent = ({ sourceImage = '' }: ImageMessageProps) => {
    return (
        <LightBox>
            <Image style={[styles.img]} resizeMode={'cover'} source={{ uri: sourceImage }} />
        </LightBox>
    )
}

export const ImageMessage = memo(ImageMessageComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

const styles = StyleSheet.create({
    img: {
        resizeMode: 'cover',
        width: scale(150),
        height: scale(180),
    }
})
