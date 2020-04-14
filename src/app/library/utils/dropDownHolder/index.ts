import { createRef } from 'react'

type TittleType = string | undefined | null;
type MessageType = string | undefined | null;
type CallBackType = Function | undefined | null;

export const dropDown = createRef();

export const showError = (title: TittleType, message: MessageType, callBack?: CallBackType) => {
  dropDown.current?.alertWithType('error', title, message);
  callBack && callBack();
}
export const showSuccess = (title: TittleType, message: MessageType, callBack?: CallBackType) => {
  dropDown.current?.alertWithType('success', title, message);
  callBack && callBack();
}

export const showWarning = (title: TittleType, message: MessageType, callBack?: CallBackType) => {
  dropDown.current?.alertWithType('warn', title, message);
  callBack && callBack();
}
export const showInfo = (title: TittleType, message: MessageType, callBack?: CallBackType) => {
  dropDown.current?.alertWithType('info', title, message);
  callBack && callBack();
}