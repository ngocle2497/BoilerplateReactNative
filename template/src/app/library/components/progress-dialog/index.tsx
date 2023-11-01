import React, {
  createRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';

import isEqual from 'react-fast-compare';

import { useDisableBackHandler, useDismissKeyboard } from '@hooks';
import { View } from '@rn-core';
import { useStyles } from '@theme';

import { styles } from './styles';

const Spinner = memo(() => {
  // state
  const { theme } = useStyles();

  // render
  return <ActivityIndicator color={theme.color.background} size={'large'} />;
}, isEqual);

const ProgressDialogComponent = forwardRef((_, ref) => {
  // state
  const [visible, setVisible] = useState(false);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );

  useDisableBackHandler(visible);

  useDismissKeyboard(visible);

  // render
  return visible ? (
    <>
      <View style={[styles.container]}>
        <Spinner />
      </View>
    </>
  ) : null;
});

export const progressDialogRef = createRef<ProgressDialogRef>();

export const ProgressDialog = () => (
  <ProgressDialogComponent ref={progressDialogRef} />
);

export const showLoading = () => {
  progressDialogRef.current?.show();
};

export const hideLoading = () => {
  progressDialogRef.current?.hide();
};

export interface ProgressDialogRef {
  show(): void;
  hide(): void;
}
