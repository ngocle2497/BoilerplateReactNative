import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';

import { styles } from './styles';
import { ItemProps } from './type';

import { Icon } from '../icon';

const DropDownItemComponent = ({
  item,
  labelStyle,
  activeItemStyle,
  activeLabelStyle,
  containerStyleItem,
  onPressItem,
  customTickIcon,
  selected = false,
}: ItemProps) => {
  // function
  const _onItemPress = () => {
    onPressItem && item && onPressItem(item.value ?? '');
  };

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
