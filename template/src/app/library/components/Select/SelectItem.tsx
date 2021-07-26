import {onCheckType} from '@common';
import React, {memo, useCallback} from 'react';
import equals from 'react-fast-compare';

import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';

import {SelectItemProps} from './Select.props';

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
      <Block
        direction={'row'}
        paddingVertical={15}
        paddingLeft={5}
        color={'#FFFFFF'}>
        {customItem ? (
          customItem(item, index)
        ) : (
          <Text
            fontSize={'FONT_14'}
            fontWeight={'normal'}
            style={[textItemStyle]}
            text={item.text ?? ''}
          />
        )}
      </Block>
    </Button>
  );
};
export const SelectItem = memo(SelectItemComponent, equals);
