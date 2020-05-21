import { createRef } from 'react';
export const animProgressHolder = createRef<any>();

export const showLoadingAnim = () => {
    animProgressHolder.current?.show()
}

export const hiddenLoadingAnim = () => {
    animProgressHolder.current?.hide()
}