import {showError, translate} from '@utils';

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {
  showError(translate('dialog:error'), msg);
};
export const onCheckType = (source: any, type: TypesBase) => {
  return typeof source === type;
};
