import { useCallback, useMemo, useState } from 'react';

import { useDidMount, useMounted } from './index';

type LoadingState = {
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
};

const initLoadingState: LoadingState = {
  loading: false,
  loadingMore: false,
  refreshing: false,
};

interface FilterType {
  Keyword?: string;
  PageIndex: number;
  PageSize: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQuery = <T, K extends Record<string, string> = any>(
  initFilter: K,
  loadData: (filter: K & FilterType, loadEnd: (res: Array<T>) => void) => void,
  ignoreDidMount = false,
) => {
  // state
  const [data, setData] = useState<Array<T>>([]);

  const [paging] = useState({
    value: {
      PageIndex: 1,
      PageSize: 1 * 100,
    },
  });

  const [filter, setFilter] = useState<K & FilterType>({
    ...initFilter,
    ...paging.value,
  });

  const [{ loading, loadingMore, refreshing }, setLoadingState] =
    useState<LoadingState>({ ...initLoadingState, loading: true });

  const canLoadMore = useMemo(() => {
    if (data.length === 0) {
      return false;
    }

    return (
      paging.value.PageSize * paging.value.PageIndex <= data.length &&
      loadingMore === false
    );
  }, [data.length, loadingMore, paging.value.PageIndex, paging.value.PageSize]);

  // func
  const updateFilter = useCallback((newFilter: Partial<FilterType> & K) => {
    setFilter(f => ({ ...f, ...newFilter }));
  }, []);

  const loadEnd = useCallback(
    (res: Array<T>) => {
      setLoadingState(initLoadingState);

      paging.value.PageIndex = 1;

      setData(res);
    },
    [paging.value],
  );

  const refreshEnd = useCallback(
    (res: Array<T>) => {
      setLoadingState(initLoadingState);

      paging.value.PageIndex = 1;

      setData(res);
    },
    [paging.value],
  );

  const loadMoreEnd = useCallback(
    (res: Array<T>) => {
      setLoadingState(initLoadingState);

      paging.value.PageIndex += 1;

      setData(d => d.concat(res));
    },
    [paging.value],
  );

  const loadWithFilter = useCallback(() => {
    setLoadingState({
      loading: true,
      loadingMore: false,
      refreshing: false,
    });

    loadData({ ...filter, PageIndex: 1 }, loadEnd);
  }, [filter, loadData, loadEnd]);

  const refresh = useCallback(() => {
    setLoadingState({
      loading: false,
      loadingMore: false,
      refreshing: true,
    });

    loadData({ ...filter, PageIndex: 1 }, refreshEnd);
  }, [filter, loadData, refreshEnd]);

  const loadMore = useCallback(() => {
    setLoadingState({
      loading: false,
      loadingMore: true,
      refreshing: false,
    });

    loadData({ ...filter, PageIndex: paging.value.PageIndex + 1 }, loadMoreEnd);
  }, [filter, loadData, loadMoreEnd, paging.value.PageIndex]);

  // effect
  useMounted(() => {
    loadWithFilter();
  }, [filter]);

  useDidMount(() => {
    if (ignoreDidMount) {
      return;
    }

    loadWithFilter();
  });

  // result
  return {
    canLoadMore,
    data,
    loadMore,
    loadWithFilter,
    loading,
    loadingMore,
    refresh,
    refreshing,
    updateData: setData,
    updateFilter,
  };
};
