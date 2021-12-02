import React, {memo, useCallback, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, useWindowDimensions, View, ViewStyle} from 'react-native';

import {Spacer} from '../spacer';

const BASE_ITEM_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    minHeight: BASE_ITEM_HEIGHT,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageOverlay: {
    width: '100%',
    height: 170,
    borderRadius: 4,
    color: 'black',
  },
  avatarOverlay: {
    width: 40,
    height: 40,
    borderRadius: 4,
    color: 'black',
  },
});

type RowOverLayProps = {
  width: number | string;
  height?: number;
  borderRadius?: number;
};
const RowOverLay = memo(
  ({width, height = 10, borderRadius = 4}: RowOverLayProps) => {
    // style
    const row = useMemo<ViewStyle>(
      () => ({
        width,
        height,
        borderRadius,
        backgroundColor: 'black',
      }),
      [borderRadius, height, width],
    );
    // render
    return <View style={[row]} />;
  },
  isEqual,
);

const ItemBase = memo(() => {
  // state
  const renderImage = useMemo<boolean>(
    () => Boolean(Math.round(Math.random() + 0.15)),
    [],
  );

  // render
  return (
    <View style={[styles.container]}>
      <View style={[styles.rowCenter]}>
        <View style={[styles.avatarOverlay]} />
        <Spacer width={10} />
        <View>
          <RowOverLay width={100} />
          <Spacer height={5} />
          <RowOverLay width={55} />
          <Spacer height={5} />
          <RowOverLay width={70} />
        </View>
      </View>
      <Spacer height={5} />
      <RowOverLay width={'100%'} />
      <Spacer height={5} />
      <RowOverLay width={'100%'} />
      <Spacer height={5} />
      <RowOverLay width={'100%'} />
      <Spacer height={10} />
      {renderImage && <View style={[styles.imageOverlay]} />}
    </View>
  );
}, isEqual);

const BaseContentComponent = () => {
  // state
  const {height: screenHeight} = useWindowDimensions();
  const listItem = useMemo<Array<number>>(
    () =>
      Array(Math.ceil(screenHeight / BASE_ITEM_HEIGHT))
        .fill(0)
        .map((_, i) => i),
    [screenHeight],
  );

  // function
  const renderItem = useCallback((item: number) => {
    return <ItemBase key={item} />;
  }, []);

  // render
  return <>{listItem.map(renderItem)}</>;
};

export const BaseContent = memo(BaseContentComponent, isEqual);
