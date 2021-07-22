/* eslint-disable @typescript-eslint/no-explicit-any */
import {onChangeAlias} from '../string/index';

/**
 * Sort array by text by all properties
 */
export const onSearchAllProperties = (
  source: Array<any>,
  textSearch: string | number,
): Array<any> => {
  return source.filter(x => {
    return Object.keys(x).some(function (key) {
      return onChangeAlias(x[key]).search(onChangeAlias(textSearch)) !== -1;
    });
  });
};
/**
 * Check source is Array. Otherwise, return [].
 */
export const onCheckArray = (source: any) => {
  if (Array.isArray(source)) {
    return source;
  }
  return [];
};
