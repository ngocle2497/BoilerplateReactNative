import React, {memo, useState} from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
} from "react-native";
import isEqual from "react-fast-compare";
import {scale} from "@common";
import {FontSizeDefault} from "@theme/fontSize";

import {Block} from "../Block/Block";
import {Text} from "../Text/Text";
import {Button} from "../Button/Button";
import {Icon} from "../Icon/Icon";
import {ImageRemote} from "../ImageRemote/ImageRemote";

import {MessageItem} from "./components/MessageItem";
import {ChatProps, MessageProps} from "./Chat.props";

const SIZE_AVATAR = scale(20);
const SIZE_DOT_STATUS = scale(5);

const ChatComponent = ({
  data,
  renderHeader,
  renderFooter,
  onBackPress,
  useHeader = true,
  showAvatar = true,
  status = true,
  colorDotActive = "#5cb85c",
  colorDotUnActive = "#99aab5",
  textStatus = "Active",
  yourAvatar,
  friendAvatar,
  nameFriend,
  onSendPress,
}: ChatProps) => {
  const [value, setValue] = useState("");
  const _renderItem = ({item, index}: ListRenderItemInfo<MessageProps>) => {
    return (
      <MessageItem
        key={item.id}
        {...item}
        {...{showAvatar, friendAvatar, yourAvatar, nameFriend}}
        nextDateCreate={
          data.length - 1 <= index ? null : data[index + 1].dateCreate + ""
        }
        prevType={index === 0 ? null : data[index - 1].sourceMessage}
      />
    );
  };
  const _keyExtractor = (item: MessageProps) => item.id + "";
  const _onChangText = (text: string) => {
    setValue(text);
  };
  const _onSendPress = () => {
    if (value.trim().length > 0) {
      onSendPress && onSendPress(value);
      setValue("");
    }
  };
  const _onBackPress = () => {
    onBackPress && onBackPress();
  };
  const _renderListFooter = () => {
    return (
      <Block justifyContent={"center"} middle paddingVertical={15}>
        <Text style={[styles.textTitle]} tx={"common:greetingChat"} />
      </Block>
    );
  };
  return (
    <Block block color={"#FFFFFF"}>
      {renderHeader
        ? renderHeader()
        : useHeader === true && (
            <Block style={styles.top} direction={"row"}>
              <Button
                onPress={_onBackPress}
                style={styles.buttonBack}
                preset={"link"}>
                <Icon style={styles.iconBack} icon={"back"} />
              </Button>
              <Block
                width={SIZE_AVATAR * 2}
                height={SIZE_AVATAR * 2}
                borderRadius={SIZE_AVATAR}>
                <ImageRemote
                  style={styles.imgAvatar}
                  styleDefault={styles.imgAvatar}
                  imgSource={friendAvatar}
                />
                <Block
                  style={[styles.dotStatus]}
                  borderWidth={scale(1)}
                  borderColor={"#ffffff"}
                  color={status === true ? colorDotActive : colorDotUnActive}
                  width={SIZE_DOT_STATUS * 2}
                  height={SIZE_DOT_STATUS * 2}
                  borderRadius={SIZE_DOT_STATUS}
                />
              </Block>
              <Block block justifyContent={"center"} paddingHorizontal={10}>
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
      <Block style={styles.bottom} direction={"row"}>
        <Block block style={[styles.wrapInput]}>
          <TextInput
            value={value}
            onChangeText={_onChangText}
            placeholder={"Aa"}
            underlineColorAndroid={"transparent"}
            selectionColor={"#333333"}
            style={[styles.input]}
          />
        </Block>
        <Button
          onPress={_onSendPress}
          style={[styles.buttonSend]}
          preset={"link"}>
          <Icon style={styles.icon} icon={"send"} />
        </Button>
      </Block>
    </Block>
  );
};

export const Chat = memo(ChatComponent, isEqual);

const styles = StyleSheet.create({
  buttonBack: {
    paddingRight: scale(12),
    paddingLeft: scale(5),
  },
  textStatus: {
    fontSize: FontSizeDefault.FONT_10,
  },
  textName: {
    fontSize: FontSizeDefault.FONT_15,
  },
  iconBack: {
    tintColor: "#0057E7",
  },
  bottom: {
    paddingVertical: scale(5),
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#bbb",
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },
  top: {
    paddingVertical: scale(5),
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bbb",
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    overflow: "hidden",
  },
  imgAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: SIZE_AVATAR,
  },
  wrapInput: {
    borderRadius: 20,
    backgroundColor: "#eeeeee",
    overflow: "hidden",
    paddingHorizontal: scale(5),
    paddingVertical: scale(3),
  },
  input: {
    padding: 0,
    fontSize: FontSizeDefault.FONT_14,
    paddingHorizontal: 5,
  },
  buttonSend: {
    paddingHorizontal: 5,
  },
  icon: {
    tintColor: "#EC2929",
  },
  textTitle: {
    fontSize: FontSizeDefault.FONT_12,
    color: "#333333",
    opacity: 0.6,
  },
  dotStatus: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
