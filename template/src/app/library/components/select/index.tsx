import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { enhance } from '@common';

import { SelectItem } from './select-item';
import { styles } from './styles';
import { SelectOption, SelectProps } from './type';

import { Modal } from '../modal';

const SelectComponent = (props: SelectProps) => {
  // state
  const [t] = useTranslation();
  const inset = useSafeAreaInsets();
  const {
    onPress,
    textItemStyle,
    rightChildren,
    useBottomInset = true,
    defaultSelect = t('dialog:select'),
    customItem = undefined,
    data = [],
    ...rest
  } = props;
  const [selectedText, setSelectedText] = useState(defaultSelect);
  const [visible, setVisible] = useState(false);

  // function
  const onPressOption = useCallback(
    (item: SelectOption, index: number) => {
      setVisible(false);
      setSelectedText(item.text);
      onPress && onPress(item, index);
    },
    [onPress],
  );

  const showDrop = () => {
    setVisible(true);
  };

  const hideDrop = () => {
    setVisible(false);
  };

  const _renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<SelectOption>) => {
      return (
        <SelectItem
          customItem={customItem}
          textItemStyle={textItemStyle}
          onPress={onPressOption}
          item={item}
          index={index}
        />
      );
    },
    [customItem, onPressOption, textItemStyle],
  );

  const _keyExtractor = useCallback(
    (item: SelectOption) =>
      item.text +
      new Date().getTime().toString() +
      Math.floor(Math.random() * Math.floor(new Date().getTime())).toString(),
    [],
  );
  // style
  const content = useMemo<ViewStyle>(
    () =>
      enhance<ViewStyle>([
        styles.content,
        {
          paddingBottom: useBottomInset ? inset.bottom : 0,
        },
      ]),
    [inset.bottom, useBottomInset],
  );
  // render
  return (
    <>
      <View style={[styles.root]} collapsable={false}>
        <TouchableOpacity onPress={showDrop} activeOpacity={0.68}>
          <View style={[styles.rowButton]}>
            <Text children={selectedText} />
            {rightChildren && rightChildren}
          </View>
        </TouchableOpacity>
        <Modal
          onBackdropPress={hideDrop}
          onBackButtonPress={hideDrop}
          animatedIn={'slideInUp'}
          hasGesture={false}
          animatedOut={'slideOutDown'}
          style={[styles.modal]}
          backdropOpacity={0.3}
          isVisible={visible}>
          <View>
            <View style={[content]}>
              <FlatList
                data={data}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                {...rest}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export const Select = memo(SelectComponent, equals);
