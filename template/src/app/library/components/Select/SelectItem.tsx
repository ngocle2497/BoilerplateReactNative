import {onCheckType} from '@common';
import {FontSizeDefault} from '@theme/fontSize';
import React, {memo, useCallback} from 'react';
import equals from 'react-fast-compare';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from '../Button/Button';

import {SelectItemProps} from './Select.props';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontWeight: 'normal',
    fontSize: FontSizeDefault.FONT_14,
  },
});
const SelectItemComponent = ({
  index,
  item,
  onPress,
  customItem,
  textItemStyle,
}: SelectItemProps) => {
  // function
  const _onPress = useCallback(() => {
    if (onCheckType(onPress, 'function')) {
      onPress(item, index);
    }
  }, [index, item, onPress]);

  // render
  return (
    <Button onPress={_onPress} activeOpacity={0.85}>
      <View style={[[styles.container]]}>
        {customItem ? (
          customItem(item, index)
        ) : (
          <Text
            style={[styles.text, textItemStyle]}
            children={item.text ?? ''}
          />
        )}
      </View>
    </Button>
  );
};
export const SelectItem = memo(SelectItemComponent, equals);
