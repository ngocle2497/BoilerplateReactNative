export {};
declare global {
  interface Array<T> {
    /**
     * Get first element of array. If array is empty, return undefined
     */
    first(defaultValue?: T): T | undefined;

    /**
     * Search all elements in array by keyword
     */
    searchAllProps(keyword: string | number): Array<T>;
  }

  interface ArrayConstructor {
    validArray<T>(source: T[]): T[];
  }
}
