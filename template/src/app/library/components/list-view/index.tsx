import React, { memo, useCallback } from 'react';
import equals from 'react-fast-compare';
import { FlatList, RefreshControl } from 'react-native';
import { ListViewProps } from './type';

const ListViewComponent = (props: ListViewProps) => {
  // state
  const {
    onLoadMore,
    onRefresh,
    canRefresh = true,
    canLoadMore = false,
    refreshing = false,
  } = props;

  // function
  const loadMore = useCallback(() => {
    if (canLoadMore && onLoadMore && typeof onLoadMore === 'function') {
      onLoadMore();
    }
  }, [canLoadMore, onLoadMore]);

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

export const ListView = memo(ListViewComponent, equals);
