import {sizeScale} from '@common';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet} from 'react-native';

import {Block} from '../../block';
import {Text} from '../../text';
import {TextMessageProps} from '../type';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: sizeScale(14),
  },
});

const TextMessageComponent = ({text}: TextMessageProps) => {
  // render
  return (
    <Block>
      <Text {...{text, style: styles.text}} />
    </Block>
  );
};

export const TextMessage = memo(TextMessageComponent, isEqual);
