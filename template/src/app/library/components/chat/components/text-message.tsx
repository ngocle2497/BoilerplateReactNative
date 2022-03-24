import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import isEqual from 'react-fast-compare';

import { sizeScale } from '@common';

import { Block } from '../../block';
import { Text } from '../../text';
import { TextMessageProps } from '../type';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: sizeScale(14),
  },
});

const TextMessageComponent = ({ text }: TextMessageProps) => {
  // render
  return (
    <Block>
      <Text {...{ text, style: styles.text }} />
    </Block>
  );
};

export const TextMessage = memo(TextMessageComponent, isEqual);
