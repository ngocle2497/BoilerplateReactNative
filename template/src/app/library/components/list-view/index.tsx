import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { execFunc } from '@common';

import { ListViewProps } from './type';

export const ListView = (props: ListViewProps) => {
  // state
  const {
    onRefresh,
    onLoadMore,
    canRefresh = true,
    canLoadMore = false,
    refreshing = false,
  } = props;

  // function
  const loadMore = () => {
    if (canLoadMore) {
      execFunc(onLoadMore);
    }
  };

  // render
  return (
    <FlatList
      refreshControl={
        canRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.001}
      {...props}
      onRefresh={undefined}
      refreshing={undefined}
    />
  );
};
