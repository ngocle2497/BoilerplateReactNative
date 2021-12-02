import {enhance} from '@common';
import React, {memo, useCallback, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {Icon} from '../icon';

import {styles} from './styles';
import {ItemProps} from './type';

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

  // style
  const activeContainer = useMemo(
    () => enhance([activeItemStyle]) as StyleProp<ViewStyle>,
    [activeItemStyle],
  );

  const activeLabel = useMemo(
    () => enhance([activeLabelStyle]) as StyleProp<ViewStyle>,
    [activeLabelStyle],
  );

  const label = useMemo(
    () =>
      enhance([
        styles.labelStyle,
        labelStyle,
        selected && activeLabel,
      ]) as StyleProp<ViewStyle>,
    [activeLabel, labelStyle, selected],
  );

  const container = useMemo(
    () =>
      enhance([
        styles.container,
        containerStyleItem,
        selected && activeContainer,
      ]) as StyleProp<ViewStyle>,
    [activeContainer, containerStyleItem, selected],
  );

  // render
  return (
    <TouchableOpacity onPress={_onItemPress}>
      <View style={[container]}>
        <Text style={[label]}>{item.label}</Text>
        <View style={[styles.wrapIcon]}>
          {selected &&
            (customTickIcon ? customTickIcon() : <Icon icon={'check'} />)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const DropDownItem = memo(DropDownItemComponent, isEqual);
