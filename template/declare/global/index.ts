/* eslint-disable @typescript-eslint/no-explicit-any */
globalThis.randomUniqueId = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

globalThis.execFunc = function <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) {
  if (typeof func === 'function') {
    func(...args);
  }
};

globalThis.isTypeof = function (
  source: any,
  type: TypesBase,
): source is TypesBase {
  return typeof source === type;
};

export {};
