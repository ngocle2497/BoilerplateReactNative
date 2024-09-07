/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extend-native */
export {};

Array.prototype.searchAllProps = function (keyword: string | number) {
  return this.filter(x => {
    return Object.keys(x).some(function (key) {
      return (
        String(x[key]).changeAlias().search(String(keyword).changeAlias()) !==
        -1
      );
    });
  });
};

Array.validArray = function <T>(source: T[]): T[] {
  if (Array.isArray(source)) {
    return source;
  }

  return [] as T[];
};
