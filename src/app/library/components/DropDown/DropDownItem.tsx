import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import isEqual from 'react-fast-compare';
import {ItemProps} from './DropDown.props';
import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {Icon} from '../Icon/Icon';
import {enhance} from '@common';

const styles = StyleSheet.create({
  labelStyle: {
    flex: 1,
    paddingRight: 5,
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
  const _onItemPress = useCallback(() => {
    onPressItem && item && onPressItem(item.value ?? '');
  }, [item, onPressItem]);

  const activeContainer = useMemo(
    () => enhance([activeItemStyle]) as StyleProp<ViewStyle>,
    [activeItemStyle],
  );
  const activeLabel = useMemo(
    () => enhance([activeLabelStyle]) as StyleProp<ViewStyle>,
    [activeLabelStyle],
  );
  const label = useMemo(
    () => enhance([styles.labelStyle, labelStyle]) as StyleProp<ViewStyle>,
    [labelStyle],
  );
  const container = useMemo(
    () => enhance([containerStyleItem]) as StyleProp<ViewStyle>,
    [containerStyleItem],
  );
  return (
    <Button onPress={_onItemPress} preset={'link'}>
      <Block
        width={'100%'}
        paddingVertical={5}
        direction={'row'}
        style={[container, selected && activeContainer]}>
        <Text style={[label, selected && activeLabel]}>{item.label}</Text>
        {selected &&
          (customTickIcon ? customTickIcon() : <Icon icon={'check'} />)}
      </Block>
    </Button>
  );
};

export const DropDownItem = memo(
  DropDownItemComponent,
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
);
