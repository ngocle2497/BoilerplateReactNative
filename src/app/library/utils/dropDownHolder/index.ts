import {createRef} from 'react';
import DropdownAlert from 'react-native-dropdownalert';

type CallBackType = Function | undefined | null;

export const dropDown = createRef<DropdownAlert>();

export const showError = (
  title = '',
  message = '',
  callBack?: CallBackType,
) => {
  dropDown.current?.alertWithType('error', title, message);
  typeof callBack === 'function' && callBack();
};
export const showSuccess = (
  title = '',
  message = '',
  callBack?: CallBackType,
) => {
  dropDown.current?.alertWithType('success', title, message);
  typeof callBack === 'function' && callBack();
};

export const showWarning = (
  title = '',
  message = '',
  callBack?: CallBackType,
) => {
  dropDown.current?.alertWithType('warn', title, message);
  typeof callBack === 'function' && callBack();
};
export const showInfo = (title = '', message = '', callBack?: CallBackType) => {
  dropDown.current?.alertWithType('info', title, message);
  typeof callBack === 'function' && callBack();
};
