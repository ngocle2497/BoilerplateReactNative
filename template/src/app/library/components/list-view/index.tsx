import React, {memo, useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import equals from 'react-fast-compare';

import {ListViewProps} from './type';

const ListViewComponent = (props: ListViewProps) => {
  // state
  const {
    onLoadMore,
    onRefreshing,
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

  const refresh = useCallback(() => {
    if (onRefreshing && typeof onRefreshing === 'function') {
      onRefreshing();
    }
  }, [onRefreshing]);

  // render
  return (
    <FlatList
      refreshControl={
        canRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        ) : undefined
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.001}
      {...props}
    />
  );
};

export const ListView = memo(ListViewComponent, equals);
