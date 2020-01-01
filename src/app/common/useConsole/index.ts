const useConsoleLog = (data: any, key?: string) => {
  if (__DEV__) {
    console.log(key, data);
  }
};
export {useConsoleLog};
