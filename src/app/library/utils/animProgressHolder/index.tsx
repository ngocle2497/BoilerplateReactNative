import { createRef } from 'react';
export const animProgressHolder = createRef();

export const showLoadingAnim = () => {
    animProgressHolder.current?.visible()
}

export const hiddenLoadingAnim = () => {
    animProgressHolder.current?.hidden()
}