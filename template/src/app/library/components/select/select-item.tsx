import React, { memo, useCallback } from 'react';
import equals from 'react-fast-compare';
import { Text, View } from 'react-native';
import { onCheckType } from '@common';
import { Button } from '../button';
import { styles } from './styles';
import { SelectItemProps } from './type';

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
