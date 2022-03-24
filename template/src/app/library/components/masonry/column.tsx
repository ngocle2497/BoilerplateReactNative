import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { Cell } from './cell';
import { DEFAULT_CELL_SPACE, DEFAULT_COLUMNS } from './constants';
import { CellProps, ColumnsProps, Dimensions, ItemColumn } from './types';

const ColumnComponent = ({
  data,
  dimensions,
  containerImageStyle,
  customRenderItem,
  columns,
  space = DEFAULT_CELL_SPACE,
  renderFooter,
  renderHeader,
}: ColumnsProps) => {
  // state
  const [columnWidth, setColumnWidth] = useState(0);
  const [dataSource, setDataSource] = useState<Array<CellProps>>([]);

  // function
  const _resizeByColumns = useCallback(
    (
      imgDimensions: Dimensions,
      listDimensions: Dimensions,
      nColumns = DEFAULT_COLUMNS,
    ) => {
      const { width } = listDimensions;
      const _columnWidth = width / nColumns - space / 2;
      if (_columnWidth !== columnWidth) {
        setColumnWidth(_columnWidth);
      }
      const divider = imgDimensions.width / columnWidth;

      const newWidth = imgDimensions.width / divider;
      const newHeight = imgDimensions.height / divider;

      return { width: newWidth, height: newHeight };
    },
    [columnWidth, space],
  );

  const _resizeImage = useCallback(() => {
    if (Array.isArray(data)) {
      return data.map((image: ItemColumn) => {
        const imageForColumn = _resizeByColumns(
          image.dimensions,
          dimensions,
          columns,
        );
        return { ...image, ...imageForColumn };
      });
    }
    return [];
  }, [_resizeByColumns, columns, data, dimensions]);

  const _keyExtractor = useCallback(
    (item: CellProps) => 'IMAGE_' + item.uri,
    [],
  );

  const _renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CellProps>) => {
      const {
        height,
        width,
        uri,
        data: dataItem,
        column,
        dimensions: dimensionsItem,
      } = item;
      const propsBase = {
        uri,
        width,
        height,
        data: dataItem,
        column,
        actualSize: dimensionsItem,
      };
      return !customRenderItem ? (
        <Cell
          {...propsBase}
          {...{
            containerImageStyle,
            space,
            dimensions,
            renderFooter,
            renderHeader,
          }}
        />
      ) : (
        customRenderItem(propsBase)
      );
    },
    [
      containerImageStyle,
      customRenderItem,
      dimensions,
      renderFooter,
      renderHeader,
      space,
    ],
  );

  const _renderSpace = useCallback(() => {
    return <View style={{ height: space }} />;
  }, [space]);

  // style
  const containerStyle = useMemo(
    () => [{ width: columnWidth, overflow: 'hidden' }] as StyleProp<ViewStyle>,
    [columnWidth],
  );

  // effect
  useEffect(() => {
    const images = _resizeImage();
    setDataSource(images);
  }, [data, dimensions, columns, columnWidth, space, _resizeImage]);

  // render
  return (
    <View style={containerStyle}>
      <FlatList
        data={dataSource}
        scrollEnabled={false}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderSpace}
        keyExtractor={_keyExtractor}
        bounces={false}
        overScrollMode={'never'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export const Column = memo(ColumnComponent, isEqual);
