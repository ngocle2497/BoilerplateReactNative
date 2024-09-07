export {};
declare global {
  interface Array<T> {
    /**
     * Search all elements in array by keyword
     */
    searchAllProps(keyword: string | number): Array<T>;
  }

  interface ArrayConstructor {
    validArray<T>(source: T[]): T[];
  }
}
