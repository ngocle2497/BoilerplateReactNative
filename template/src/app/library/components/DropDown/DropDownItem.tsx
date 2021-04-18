import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import isEqual from 'react-fast-compare';
import {enhance} from '@common';

import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {Icon} from '../Icon/Icon';

import {ItemProps} from './DropDown.props';

const styles = StyleSheet.create({
  labelStyle: {
    flex: 1,
    paddingRight: 5,
  },
  container: {
    alignItems: 'center',
  },
  wrapIcon: {
    minHeight: 24,
  },
});

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
    <Button onPress={_onItemPress} preset={'link'}>
      <Block
        width={'100%'}
        paddingVertical={5}
        direction={'row'}
        style={[container]}>
        <Text style={[label]}>{item.label}</Text>
        <Block style={[styles.wrapIcon]}>
          {selected &&
            (customTickIcon ? customTickIcon() : <Icon icon={'check'} />)}
        </Block>
      </Block>
    </Button>
  );
};

export const DropDownItem = memo(DropDownItemComponent, isEqual);
