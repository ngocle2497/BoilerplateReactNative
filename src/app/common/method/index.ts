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
  alert(msg)
};
export const onCheckType = (source: any, type: TypesBase) => {
  return typeof source === type;
};
export function onCheckTS<T>(arg: any, propUnique: string, typeOfProps: TypesBase): arg is T {
  return arg && arg[propUnique] && typeof (arg[propUnique]) == typeOfProps
}