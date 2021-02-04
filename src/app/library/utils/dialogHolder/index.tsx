import {createRef} from 'react';
import {ProgressDialogRef, SnackBarRef} from '@components';
import {TypeMessage} from '@library/components/SnackBar/type';
import {ImageTransitionRef} from '@library/components/LightBox/ImageTransition';

import {translate} from '../i18n/translate';

export const dialogHolder = createRef<ProgressDialogRef>();
export const snackBarHolder = createRef<SnackBarRef>();
export const imageTransitionHolder = createRef<ImageTransitionRef>();

export const showLoading = (msg = translate('dialog:loading')) => {
  dialogHolder.current?.show(msg);
};

export const hideLoading = () => {
  dialogHolder.current?.hide();
};

export const showSnack = ({
  msg,
  interval,
  type,
}: {
  msg: string;
  interval?: number;
  type?: TypeMessage;
}) => {
  snackBarHolder.current?.show({msg, interval, type});
};
