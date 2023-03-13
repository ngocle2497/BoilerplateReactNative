import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useAsyncState, useInterval } from '@hooks';

import {
  DELAY_MS,
  DURATION,
  MIN_HEIGHT_ITEM,
  OVERLAY_COLOR,
} from './constants';
import { ItemComment } from './item-comment';
import { styles } from './styles';
import { CommentLoadingProps } from './type';

export const CommentLoading = ({
  overlayColor = OVERLAY_COLOR,
}: CommentLoadingProps) => {
  // state
  const [reRender, setReRender] = useAsyncState<boolean>(false);

  const { height: screenHeight } = useWindowDimensions();

  const listItem = useMemo<Array<number>>(
    () =>
      Array(Math.ceil(screenHeight / MIN_HEIGHT_ITEM))
        .fill(0)
        .map((_, i) => i),
    [screenHeight],
  );

  // function
  const renderItem = (item: number) => {
    return reRender ? null : (
      <ItemComment overlayColor={overlayColor} key={item} index={item} />
    );
  };

  useInterval(() => {
    setReRender(
      v => !v,
      () => {
        setReRender(v => !v);
      },
    );
  }, DELAY_MS * listItem.length - 1 + DURATION);

  // render
  return <View style={[styles.wrap]}>{listItem.map(renderItem)}</View>;
};
