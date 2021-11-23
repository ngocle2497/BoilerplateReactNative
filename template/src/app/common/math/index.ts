/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNumber = (num: any): boolean => {
  return !isNaN(parseFloat(String(num)));
};
export const tryParseNumber = (num: any): any => {
  if (isNumber(num)) {
    return parseFloat(String(num));
  }
  return num;
};

export const roundMaxFixed = (num: number, decimals: number): number => {
  return Number(
    Math.round(Number(String(num + 'e' + decimals))) + 'e-' + decimals,
  );
};

export const formatNumber = (num: number | string, comma = ',') => {
  if (typeof num !== 'number' && typeof num !== 'string') {
    return num;
  }
  return String(num).replace(/(\d)(?=(\d{3})+\b)/g, `$1${comma}`);
};
