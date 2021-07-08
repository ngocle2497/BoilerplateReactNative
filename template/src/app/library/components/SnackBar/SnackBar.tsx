import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {DURATION_HIDE} from './constants';
import {SnackItem} from './SnackBarItem';
import {Item, SnackBarProps, TypeMessage} from './type';

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    paddingHorizontal: 15,
  },
});

const SnackBarComponent = forwardRef((props: SnackBarProps, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: ({
        interval = DURATION_HIDE,
        msg,
        type = 'success',
      }: {
        msg: string;
        interval: number;
        type: TypeMessage;
      }) => {
        setData(d =>
          d.concat([
            {
              id: new Date().getTime(),
              msg,
              type,
              interval,
            },
          ]),
        );
      },
    }),
    [],
  );

  // state
  const [data, setData] = useState<Item[]>([]);
  const inset = useSafeAreaInsets();
  // function
  const _onPop = useCallback((item: Item) => {
    setData(d => d.filter(x => x.id !== item.id));
  }, []);

  const _renderItem = useCallback(
    (item: Item) => (
      <SnackItem key={item.id} {...{item, onPop: _onPop}} {...props} />
    ),
    [_onPop, props],
  );

  // render
  return (
    <View
      pointerEvents={'box-none'}
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        {marginTop: inset.top},
      ]}>
      {data.map(_renderItem)}
    </View>
  );
});
type SnackBar = {
  show: (data: {msg: string; interval?: number; type?: TypeMessage}) => void;
};
export const snackBarRef = createRef<SnackBar>();
export const SnackBar = memo(
  () => <SnackBarComponent ref={snackBarRef} />,
  isEqual,
);

export const showSnack = ({
  msg,
  interval,
  type,
}: {
  msg: string;
  interval?: number;
  type?: TypeMessage;
}) => {
  snackBarRef.current?.show({msg, interval, type});
};
