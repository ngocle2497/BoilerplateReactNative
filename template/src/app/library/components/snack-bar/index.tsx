import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';

import { View } from '@rn-core';

import { DURATION_HIDE } from './constants';
import { SnackItem } from './snack-bar-item';
import { styles } from './styles';
import { Item, TypeMessage } from './type';

const SnackBarComponent = forwardRef((_, ref) => {
  // state
  const [data, setData] = useState<Item[]>([]);

  // function
  const onPop = useCallback((item: Item) => {
    setData(d => d.filter(x => x.id !== item.id));
  }, []);

  const _renderItem = (item: Item, index: number) => (
    <SnackItem index={index} key={item.id} {...{ item, onPop }} />
  );

  // effect
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
              id: String().randomUniqueId(),
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

  // render
  return (
    <View
      pointerEvents={'box-none'}
      style={[StyleSheet.absoluteFillObject, styles.container]}>
      {data.map(_renderItem)}
    </View>
  );
});

type SnackBar = {
  show: (data: { msg: string; interval?: number; type?: TypeMessage }) => void;
};

export const snackBarRef = createRef<SnackBar>();

export const SnackBar = () => <SnackBarComponent ref={snackBarRef} />;

export const showSnack = ({
  msg,
  interval,
  type,
}: {
  msg: string;
  interval?: number;
  type?: TypeMessage;
}) => {
  snackBarRef.current?.show({ msg, interval, type });
};
