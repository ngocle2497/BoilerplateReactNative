import React, { memo } from 'react';

import equals from 'react-fast-compare';

import { isTypeof } from '@common';
import { Text, View } from '@rn-core';

import { styles } from './styles';
import { SelectItemProps } from './type';

import { Button } from '../button';

const SelectItemComponent = ({
  item,
  index,
  textItemStyle,
  onPress,
  customItem,
}: SelectItemProps) => {
  // function
  const _onPress = () => {
    if (isTypeof(onPress, 'function')) {
      onPress(item, index);
    }
  };

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
