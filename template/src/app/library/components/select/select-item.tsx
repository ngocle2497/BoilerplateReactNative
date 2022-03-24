import React, { memo, useCallback } from 'react';
import { Text, View } from 'react-native';

import equals from 'react-fast-compare';

import { onCheckType } from '@common';

import { styles } from './styles';
import { SelectItemProps } from './type';

import { Button } from '../button';

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
