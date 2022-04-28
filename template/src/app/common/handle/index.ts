import { sizeScale } from '../scale/index';

export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};
export const propsToStyle = <T = Record<string, number | string>>(
  arrStyle: Array<T>,
) => {
  return arrStyle
    .filter(
      x => x !== undefined && !Object.values(x).some(v => v === undefined),
    )
    .reduce((prev: Record<string, number | string>, curr) => {
      const firstKey = Object.keys(curr)[0] as keyof T;
      const firstValue = curr[firstKey];

      if (
        !['opacity', 'zIndex', 'flex'].includes(firstKey as string) &&
        typeof firstValue === 'number'
      ) {
        (curr[firstKey] as unknown as number) = sizeScale(firstValue);
      }
      return { ...prev, ...curr };
    }, {} as Record<string, number | string>);
};
