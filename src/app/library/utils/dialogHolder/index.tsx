import { createRef } from 'react';
import { translate } from '../i18n/translate';
import { ProgressDialogRef, SnackBarRef } from '@components';
import { TypeMessage } from '@library/components/SnackBar/type';
export const dialogHolder = createRef<ProgressDialogRef>();
export const snackBarHolder = createRef<SnackBarRef>()

export const showLoading = (msg = translate('dialog:loading')) => {
  dialogHolder.current?.show(msg);
};

export const hideLoading = () => {
  dialogHolder.current?.hide();
};

export const showSnack = (msg: string, interval?: number, type?: TypeMessage) => {
  snackBarHolder.current?.show(msg, interval, type)
}