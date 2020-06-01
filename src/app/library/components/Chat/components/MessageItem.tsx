import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import isEqual from 'react-fast-compare'
import { MessageProps, ChatProps, SourceMessage } from '../Chat.props';
import { Block } from '../../Block/Block';
import { Text } from '../../Text/Text';
import { Bubble } from './Bubble';
import { TextMessage } from './TextMessage';
import { ImageMessage } from './ImageMessage';
import { ImageRemote } from '../../ImageRemote/ImageRemote';
import { scale } from '@common';
import { FontSizeDefault } from '@theme/fontSize';

interface MessageItemProps extends MessageProps, Pick<ChatProps, 'showAvatar' | 'yourAvatar' | 'friendAvatar' | 'nameFriend'> {
    prevType: SourceMessage | null;
    nextDateCreate: string | null;
}

const SIZE_AVATAR = scale(12);

const MessageItemComponent = ({ sourceMessage, nextDateCreate, yourAvatar = "", friendAvatar = "", nameFriend, prevType, type, dateCreate, dateSeen, sourceImage, text, showAvatar }: MessageItemProps) => {

    const _renderMessage = () => {
        switch (type) {
            case 'text':
                return <TextMessage {...{ text }} />;
            case 'image':
                return <ImageMessage {...{ sourceImage }} />;
            default:
                return null;
        }
    }
    return (
        <>
            <Block marginBottom={prevType !== sourceMessage ? 5 : 1} direction={'row'} width={'100%'} style={[sourceMessage === 'mine' ? styles.mine : styles.friend]}>
                {sourceMessage === 'friend' && <Block style={[styles.avatar]} borderRadius={SIZE_AVATAR} width={SIZE_AVATAR * 2} height={SIZE_AVATAR * 2}>
                    {showAvatar === true && (prevType === 'mine' || prevType === null) && <ImageRemote style={[styles.img]} resizeMode={'cover'} imgSource={friendAvatar} />}
                </Block>}
                {sourceMessage === 'mine' && <Block block />}
                <Bubble {...{ prevType, sourceMessage, type }}>
                    {_renderMessage()}
                </Bubble>
                {sourceMessage === 'friend' && <Block block />}
                {sourceMessage === 'mine' && <Block style={[styles.avatar]} borderRadius={SIZE_AVATAR} width={SIZE_AVATAR * 2} height={SIZE_AVATAR * 2}>
                    {showAvatar === true && (prevType === 'friend' || prevType === null) && <ImageRemote style={[styles.img]} resizeMode={'cover'} imgSource={yourAvatar} />}
                </Block>}
            </Block>
            {(nextDateCreate !== dateCreate || nextDateCreate === null) && <Text numberOfLines={1} style={styles.textDate} text={dateCreate} />}
        </>
    )
}

export const MessageItem = memo(MessageItemComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

const styles = StyleSheet.create({
    mine: {
        alignContent: 'flex-end',
        paddingLeft: 10,
    },
    friend: {
        alignItems: 'flex-start',
        paddingRight: 10
    },
    avatar: {
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-end',
        marginHorizontal: 3
    },
    img: {
        width: '100%',
        height: '100%'
    },
    textDate: {
        alignSelf: 'center',
        textAlign: 'center',
        color: '#bbb',
        fontSize: FontSizeDefault.FONT_10
    }
})
