import React, { memo, useCallback, useMemo } from 'react';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
} from 'react-native';

import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';

import { Injector } from './injector';
import { CellProps } from './types';

const CellComponent = ({
  onPress,
  containerImageStyle,
  data,
  width,
  height,
  uri,
  column,
  dimensions,
  renderFooter,
  renderHeader,
}: CellProps) => {
  // state
  const dataBase = useMemo(
    () => ({ uri, width, height, data, column, actualSize: dimensions }),
    [uri, width, height, data, column, dimensions],
  );

  // function
  const _onPress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(dataBase);
    }
  }, [onPress, dataBase]);

  const _renderHeader = useCallback(() => {
    return renderHeader ? renderHeader(dataBase) : null;
  }, [dataBase, renderHeader]);

  const _renderFooter = useCallback(() => {
    return renderFooter ? renderFooter(dataBase) : null;
  }, [dataBase, renderFooter]);

  // style
  const imageStyle = useMemo(
    () =>
      [
        { width: width, height: height, minHeight: 0, minWidth: 0 },
        containerImageStyle,
      ] as StyleProp<ImageStyle>,
    [width, height, containerImageStyle],
  );

  // props
  const imageProps = useMemo<ImageProps>(
    () => ({
      key: uri,
      data: data,
      resizeMethod: 'auto',
      source: { uri },
      style: imageStyle,
    }),
    [imageStyle, uri, data],
  );

  // render
  return (
    <View>
      <TouchableOpacity
        onPress={_onPress}
        activeOpacity={typeof onPress === 'function' ? 0.6 : 1}>
        <View>
          {_renderHeader()}
          <Injector defaultComponent={FastImage} defaultProps={imageProps} />
          {_renderFooter()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const Cell = memo(CellComponent, isEqual);
