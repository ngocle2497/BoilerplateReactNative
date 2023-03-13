import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { DURATION_HIDE } from './constants';
import { SnackItem } from './snack-bar-item';
import { styles } from './styles';
import { Item, TypeMessage } from './type';

const SnackBarComponent = forwardRef((_, ref) => {
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
        setQueueData(d =>
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

  // state
  const [queueData, setQueueData] = useState<Array<Item>>([]);

  const [data, setData] = useState<Item[]>([]);

  // function
  const onPop = useCallback(
    (item: Item) => {
      const newData = queueData.length <= 0 ? [] : [queueData[0]];

      setQueueData(d => d.filter(x => x.id !== item.id));

      setData(newData);
    },
    [queueData],
  );

  const _renderItem = (item: Item) => (
    <SnackItem key={item.id} {...{ item, onPop }} />
  );

  // effect
  useEffect(() => {
    if (queueData.length > 0) {
      setData([queueData[0]]);
    }
  }, [queueData]);

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
