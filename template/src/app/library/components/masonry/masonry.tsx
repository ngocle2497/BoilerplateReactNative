import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { Column } from './column';
import { DEFAULT_CELL_SPACE, DEFAULT_COLUMNS } from './constants';
import {
  assignObjectColumn,
  assignObjectIndex,
  containMatchingUri,
  onCheckNumber,
} from './handle';
import { DataType, Dimensions, ItemColumn, MasonryProps } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
});

const MasonryComponent = ({
  data = [],
  containerImageStyle,
  customRenderItem,
  refreshColor,
  canRefresh = false,
  onRefresh,
  refreshing = false,
  onEndReach,
  columns = DEFAULT_COLUMNS,
  space = DEFAULT_CELL_SPACE,
  onPress,
  renderFooter,
  renderHeader,
}: MasonryProps) => {
  // state
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });
  const [dataSource, setDataSource] = useState<Array<ItemColumn[]>>([]);
  const [oldColumn, setOldColumn] = useState<number>(columns);
  const [oldData, setOldData] = useState<DataType[]>([]);

  // function
  /**
   * Insert or concat image to array image of column
   * @returns Array
   */
  const _insertIntoColumn = useCallback(
    (img: ItemColumn, dataSet: Array<ItemColumn[]>) => {
      const dataCopy = dataSet.slice();
      const columnIndex = img.column;

      const column = dataSet[columnIndex];

      if (column) {
        // Append to existing "row"/"column"
        if (!column.find((x: ItemColumn) => x.uri === img.uri)) {
          const newImages = column.concat(img);
          dataCopy[columnIndex] = newImages;
        }
      } else {
        // Pass it as a new "row" for the data source
        dataCopy[columnIndex] = [img];
      }

      return dataCopy;
    },
    [],
  );
  /**
   * Convert data to multi array to multi column
   */
  const _formatData = useCallback(
    (
      _data: DataType[],
      _columns: number,
      isChangeColumn = false,
      offset = 0,
    ) => {
      if (_data.length <= 0 || _columns <= 0) {
        setDataSource([]);
        return;
      }

      let newData: Array<ItemColumn[]> = isChangeColumn ? [] : dataSource;

      const dataOf = _data
        .map((cell, index) => assignObjectColumn(_columns, index, cell))
        .map((cell, index) => assignObjectIndex(offset + index, cell));

      for (let index = 0; index < dataOf.length; index++) {
        const element = dataOf[index];
        Image.getSize(
          element.uri,
          (width, height) => {
            if (onCheckNumber(width) && onCheckNumber(height)) {
              const dataConcat = _insertIntoColumn(
                {
                  ...element,
                  dimensions: {
                    width,
                    height,
                  },
                },
                newData,
              );
              newData = dataConcat;
              setDataSource(newData);
            }
          },
          _ => {
            console.warn('Image failed to load');
          },
        );
      }
    },
    [_insertIntoColumn, dataSource],
  );

  const _onLayoutChange = useCallback(
    ({
      nativeEvent: {
        layout: { height, width },
      },
    }: LayoutChangeEvent) => {
      setDimensions({ height, width });
    },
    [],
  );

  const _onHandleEndReach = useCallback(() => {
    if (typeof onEndReach === 'function') {
      onEndReach();
    }
  }, [onEndReach]);

  const _onRefresh = useCallback(() => {
    if (typeof onRefresh === 'function') {
      onRefresh();
    }
  }, [onRefresh]);

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ItemColumn[]>) => {
      return (
        <Column
          {...{
            onPress,
            space: space < 0 ? 0 : space,
            containerImageStyle,
            customRenderItem,
            renderFooter,
            renderHeader,
            dimensions,
            columns: oldColumn,
          }}
          data={item}
        />
      );
    },
    [
      containerImageStyle,
      customRenderItem,
      dimensions,
      oldColumn,
      onPress,
      renderFooter,
      renderHeader,
      space,
    ],
  );

  const _keyExtractor = useCallback(
    (_: ItemColumn[], index) => index.toString(),
    [],
  );

  // effect
  useEffect(() => {
    if (Array.isArray(data)) {
      const _actualColumn = columns > data.length ? data.length : columns;
      const driffData = containMatchingUri(oldData, data);
      const _uniqueCount = driffData.length + data.length;
      _formatData(
        driffData.length === 0 ? oldData : driffData,
        _actualColumn,
        oldColumn !== _actualColumn,
        _uniqueCount,
      );
      setOldColumn(_actualColumn);
      setOldData(data);
    }
  }, [data, columns, space, oldData, _formatData, oldColumn]);

  // render
  return (
    <View onLayout={_onLayoutChange} style={[styles.container]}>
      <FlatList
        refreshControl={
          canRefresh ? (
            <RefreshControl
              colors={refreshColor}
              onRefresh={_onRefresh}
              refreshing={refreshing}
            />
          ) : undefined
        }
        data={dataSource}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.content]}
        removeClippedSubviews={true}
        onEndReached={_onHandleEndReach}
        onEndReachedThreshold={16}
      />
    </View>
  );
};

export const Masonry = memo(MasonryComponent, isEqual);
