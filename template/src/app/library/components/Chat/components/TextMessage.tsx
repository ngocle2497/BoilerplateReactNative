import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import isEqual from 'react-fast-compare';
import {FontSizeDefault} from '@theme/fontSize';

import {TextMessageProps} from '../Chat.props';
import {Block} from '../../Block/Block';
import {Text} from '../../Text/Text';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: FontSizeDefault.FONT_14,
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
