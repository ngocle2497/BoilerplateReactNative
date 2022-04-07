import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import isEqual from 'react-fast-compare';

import { sizeScale } from '@common';

import { Bubble } from './bubble';
import { ImageMessage } from './image-message';
import { TextMessage } from './text-message';

import { Block } from '../../block';
import { Image } from '../../image';
import { Text } from '../../text';
import { ChatProps, MessageProps, SourceMessage } from '../type';

const styles = StyleSheet.create({
  mine: {
    alignContent: 'flex-end',
    paddingLeft: 10,
  },
  friend: {
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  avatar: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
    marginHorizontal: 3,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  textDate: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#bbb',
    fontSize: sizeScale(10),
  },
});

interface MessageItemProps
  extends MessageProps,
    Pick<
      ChatProps,
      'showAvatar' | 'yourAvatar' | 'friendAvatar' | 'nameFriend'
    > {
  prevType: SourceMessage | null;
  nextDateCreate: string | null;
}

const SIZE_AVATAR = sizeScale(12);

const MessageItemComponent = ({
  sourceMessage,
  nextDateCreate,
  yourAvatar = '',
  friendAvatar = '',
  prevType,
  type,
  dateCreate,
  sourceImage,
  text,
  showAvatar,
}: MessageItemProps) => {
  // function
  const _renderMessage = () => {
    switch (type) {
      case 'text':
        return <TextMessage {...{ text }} />;
      case 'image':
        return <ImageMessage {...{ sourceImage }} />;
      default:
        return null;
    }
  };

  // render
  return (
    <>
      <Block
        marginBottom={prevType !== sourceMessage ? 5 : 1}
        direction={'row'}
        width={'100%'}
        style={[sourceMessage === 'mine' ? styles.mine : styles.friend]}>
        {sourceMessage === 'friend' && (
          <Block
            style={[styles.avatar]}
            borderRadius={SIZE_AVATAR}
            width={SIZE_AVATAR * 2}
            height={SIZE_AVATAR * 2}>
            {showAvatar === true &&
              (prevType === 'mine' || prevType === null) && (
                <Image
                  style={[styles.img]}
                  resizeMode={'cover'}
                  source={friendAvatar}
                />
              )}
          </Block>
        )}
        {sourceMessage === 'mine' && <Block block />}
        <Bubble {...{ prevType, sourceMessage, type }}>
          {_renderMessage()}
        </Bubble>
        {sourceMessage === 'friend' && <Block block />}
        {sourceMessage === 'mine' && (
          <Block
            style={[styles.avatar]}
            borderRadius={SIZE_AVATAR}
            width={SIZE_AVATAR * 2}
            height={SIZE_AVATAR * 2}>
            {showAvatar === true &&
              (prevType === 'friend' || prevType === null) && (
                <Image
                  style={[styles.img]}
                  resizeMode={'cover'}
                  source={yourAvatar}
                />
              )}
          </Block>
        )}
      </Block>
      {(nextDateCreate !== dateCreate || nextDateCreate === null) && (
        <Text numberOfLines={1} style={styles.textDate} text={dateCreate} />
      )}
    </>
  );
};

export const MessageItem = memo(MessageItemComponent, isEqual);
