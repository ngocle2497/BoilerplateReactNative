import { createRef } from 'react';
import { translate } from '../i18n/translate';
export const dialogHolder = createRef<any>();

export const showLoading = (msg = translate("dialog:loading")) => {
    dialogHolder.current?.show(msg)
}

export const hiddenLoading = () => {
    dialogHolder.current?.hide()
}