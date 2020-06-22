import {onChangeAlias} from '../string/index';

export const onSearchAllProperties = (
  source: Array<any>,
  textSearch: string | number,
): Array<any> => {
  return source.filter((x) => {
    return Object.keys(x).some(function (key) {
      return onChangeAlias(x[key]).search(onChangeAlias(textSearch)) !== -1;
    });
  });
};
export const onCheckArray = (source: any) => {
  if (Array.isArray(source)) {
    return source;
  }
  return [];
};
