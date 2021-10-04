import {useDisableBackHandler, useDismissKeyboard} from '@common';
import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';
import React, {
  createRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {Block} from '../Block/Block';

const Spinner = memo(() => {
  // state
  const theme: AppTheme = useTheme();
  // render
  return <ActivityIndicator color={theme.colors.background} size={'large'} />;
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
      <Block
        color={'rgba(0,0,0,.3)'}
        style={StyleSheet.absoluteFillObject}
        middle
        justifyContent={'center'}>
        <Spinner />
      </Block>
    </>
  ) : null;
});

export const progressDialogRef = createRef<ProgressDialogRef>();
export const ProgressDialog = memo(
  () => <ProgressDialogComponent ref={progressDialogRef} />,
  isEqual,
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
