import React, { memo, useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { sizeScale } from '@common';

import { MessageItem } from './components/message-item';
import { ChatProps, MessageProps } from './type';

import { Block } from '../block';
import { Button } from '../button';
import { Icon } from '../icon';
import { Image } from '../image';
import { Text } from '../text';

const SIZE_AVATAR = sizeScale(20);
const SIZE_DOT_STATUS = sizeScale(5);

const styles = StyleSheet.create({
  buttonBack: {
    paddingRight: sizeScale(12),
    paddingLeft: sizeScale(5),
  },
  textStatus: {
    fontSize: sizeScale(10),
  },
  textName: {
    fontSize: sizeScale(15),
  },
  bottom: {
    paddingVertical: sizeScale(5),
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bbb',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  top: {
    paddingVertical: sizeScale(5),
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  imgAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: SIZE_AVATAR,
  },
  wrapInput: {
    borderRadius: 20,
    backgroundColor: '#eeeeee',
    overflow: 'hidden',
    paddingHorizontal: sizeScale(5),
    paddingVertical: sizeScale(3),
  },
  input: {
    padding: 0,
    fontSize: sizeScale(14),
    paddingHorizontal: 5,
  },
  buttonSend: {
    paddingHorizontal: 5,
  },
  textTitle: {
    fontSize: sizeScale(12),
    color: '#333333',
    opacity: 0.6,
  },
  dotStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const ChatComponent = ({
  data,
  renderHeader,
  renderFooter,
  onBackPress,
  useHeader = true,
  showAvatar = true,
  status = true,
  colorDotActive = '#5cb85c',
  colorDotUnActive = '#99aab5',
  textStatus = 'Active',
  yourAvatar,
  friendAvatar,
  nameFriend,
  onSendPress,
}: ChatProps) => {
  // state
  const [value, setValue] = useState('');

  // function
  const _renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<MessageProps>) => {
      return (
        <MessageItem
          key={item.id}
          {...item}
          {...{ showAvatar, friendAvatar, yourAvatar, nameFriend }}
          nextDateCreate={
            data.length - 1 <= index ? null : data[index + 1].dateCreate + ''
          }
          prevType={index === 0 ? null : data[index - 1].sourceMessage}
        />
      );
    },
    [data, friendAvatar, nameFriend, showAvatar, yourAvatar],
  );

  const _keyExtractor = useCallback((item: MessageProps) => item.id + '', []);

  const _onChangText = useCallback((text: string) => {
    setValue(text);
  }, []);

  const _onSendPress = useCallback(() => {
    if (value.trim().length > 0) {
      onSendPress && onSendPress(value);
      setValue('');
    }
  }, [onSendPress, value]);

  const _onBackPress = useCallback(() => {
    onBackPress && onBackPress();
  }, [onBackPress]);

  const _renderListFooter = useCallback(() => {
    return (
      <Block justifyContent={'center'} middle paddingVertical={15}>
        <Text style={[styles.textTitle]} tx={'common:greetingChat'} />
      </Block>
    );
  }, []);

  // render
  return (
    <Block block color={'#FFFFFF'}>
      {renderHeader
        ? renderHeader()
        : useHeader === true && (
            <Block style={styles.top} direction={'row'}>
              <Button onPress={_onBackPress} style={styles.buttonBack}>
                <Icon color={'#0057E7'} icon={'back'} />
              </Button>
              <Block
                width={SIZE_AVATAR * 2}
                height={SIZE_AVATAR * 2}
                borderRadius={SIZE_AVATAR}>
                <Image style={styles.imgAvatar} source={friendAvatar} />
                <Block
                  style={[styles.dotStatus]}
                  borderWidth={sizeScale(1)}
                  borderColor={'#ffffff'}
                  color={status === true ? colorDotActive : colorDotUnActive}
                  width={SIZE_DOT_STATUS * 2}
                  height={SIZE_DOT_STATUS * 2}
                  borderRadius={SIZE_DOT_STATUS}
                />
              </Block>
              <Block block justifyContent={'center'} paddingHorizontal={10}>
                <Text style={[styles.textName]} text={nameFriend} />
                <Text style={[styles.textStatus]} text={textStatus} />
              </Block>
            </Block>
          )}
      <FlatList
        data={data}
        extraData={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        inverted
        ListFooterComponent={renderFooter ? renderFooter : _renderListFooter}
        showsVerticalScrollIndicator={false}
      />
      <Block style={styles.bottom} direction={'row'}>
        <Block block style={[styles.wrapInput]}>
          <TextInput
            value={value}
            onChangeText={_onChangText}
            placeholder={'Aa'}
            underlineColorAndroid={'transparent'}
            selectionColor={'#333333'}
            style={[styles.input]}
          />
        </Block>
        <Button onPress={_onSendPress} style={[styles.buttonSend]}>
          <Icon color={'#EC2929'} icon={'send'} />
        </Button>
      </Block>
    </Block>
  );
};

export const Chat = memo(ChatComponent, isEqual);
