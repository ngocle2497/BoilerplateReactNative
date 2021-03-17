import React, {memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import isEqual from 'react-fast-compare';
import {scale} from '@common';

import {Block} from '../../Block/Block';
import {BubbleProps, MessageProps, SourceMessage} from '../Chat.props';

interface BubbleActualProps
  extends BubbleProps,
    Pick<MessageProps, 'sourceMessage' | 'type'> {
  prevType: SourceMessage | null;
}
const BubbleComponent = ({
  children,
  sourceMessage,
  prevType,
  type,
}: BubbleActualProps) => {
  const styleRadius = useMemo(
    () => [
      sourceMessage === 'mine' &&
        (prevType === 'friend' || prevType === null) &&
        styles.lastMine,
      sourceMessage === 'friend' &&
        (prevType === 'mine' || prevType === null) &&
        styles.lastFriend,
    ],
    [sourceMessage, prevType],
  );
  return (
    <Block
      style={[styles.wrap, styleRadius, type === 'text' && styles.msgText]}
      color={type === 'text' ? '#0057E7' : 'transparent'}>
      {children}
    </Block>
  );
};

export const Bubble = memo(BubbleComponent, isEqual);

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: scale(250),
    minHeight: scale(20),
  },
  msgText: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
  },
  lastMine: {
    borderBottomRightRadius: 3,
  },
  lastFriend: {
    borderBottomLeftRadius: 3,
  },
});
