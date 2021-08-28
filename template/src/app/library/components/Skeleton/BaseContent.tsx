import React, {memo, useCallback, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {useWindowDimensions} from 'react-native';

import {Block} from '../Block/Block';
import {Spacer} from '../Spacer/Spacer';

const BASE_ITEM_HEIGHT = 70;
type RowOverLayProps = {
  width: number | string;
  height?: number;
  borderRadius?: number;
};
const RowOverLay = memo(
  ({width, height = 10, borderRadius = 4}: RowOverLayProps) => {
    return (
      <Block
        width={width}
        height={height}
        borderRadius={borderRadius}
        color={'black'}
      />
    );
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
    <Block
      minHeight={BASE_ITEM_HEIGHT}
      width={'100%'}
      marginBottom={20}
      paddingHorizontal={25}>
      <Block direction={'row'} middle>
        <Block width={40} height={40} borderRadius={4} color={'black'} />
        <Spacer width={10} />
        <Block>
          <RowOverLay width={100} />
          <Spacer height={5} />
          <RowOverLay width={55} />
          <Spacer height={5} />
          <RowOverLay width={70} />
        </Block>
      </Block>
      <Spacer height={5} />
      <RowOverLay width={'100%'} />
      <Spacer height={5} />
      <RowOverLay width={'100%'} />
      <Spacer height={5} />
      <RowOverLay width={'100%'} />
      <Spacer height={10} />
      {renderImage && (
        <Block width={'100%'} height={170} borderRadius={4} color={'black'} />
      )}
    </Block>
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
