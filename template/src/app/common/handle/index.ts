import { sizeScale } from '../scale/index';

export const checkKeyInObject = (T: any, key: string) => {
  return Object.keys(T).includes(key);
};
export const propsToStyle = <T = any>(arrStyle: Array<T>) => {
  return arrStyle
    .filter(
      x => x !== undefined && !Object.values(x).some(v => v === undefined),
    )
    .reduce((prev: Record<string, unknown>, curr: any) => {
      // eslint-disable-next-line prefer-destructuring
      const firstKey = Object.keys(curr)[0];
      const firstValue = curr[firstKey];

      if (
        !['opacity', 'zIndex', 'flex'].includes(firstKey as never) &&
        typeof firstValue === 'number'
      ) {
        curr[firstKey] = sizeScale(firstValue);
      }
      return { ...prev, ...curr };
    }, {});
};
