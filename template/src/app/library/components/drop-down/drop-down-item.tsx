import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';

import { styles } from './styles';
import { ItemProps } from './type';

import { Icon } from '../icon';

const DropDownItemComponent = ({
  item,
  onPressItem,
  selected = false,
  activeItemStyle,
  activeLabelStyle,
  containerStyleItem,
  customTickIcon,
  labelStyle,
}: ItemProps) => {
  // function
  const _onItemPress = useCallback(() => {
    onPressItem && item && onPressItem(item.value ?? '');
  }, [item, onPressItem]);

  // render
  return (
    <TouchableOpacity onPress={_onItemPress}>
      <View
        style={[
          styles.container,
          containerStyleItem,
          selected && activeItemStyle,
        ]}>
        <Text
          style={[styles.labelStyle, labelStyle, selected && activeLabelStyle]}>
          {item.label}
        </Text>
        <View style={[styles.wrapIcon]}>
          {selected &&
            (customTickIcon ? customTickIcon() : <Icon icon={'check'} />)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const DropDownItem = memo(DropDownItemComponent, isEqual);
