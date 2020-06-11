import { createRef } from 'react';
import { translate } from '../i18n/translate';
import { ProgressDialogRef } from '@components';
export const dialogHolder = createRef<ProgressDialogRef>();

export const showLoading = (msg = translate("dialog:loading")) => {
    dialogHolder.current?.show(msg)
}

export const hideLoading = () => {
    dialogHolder.current?.hide()
}