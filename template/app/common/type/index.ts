export type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? {screen: K; params?: ParamList[K]}
    : {screen: K; params: ParamList[K]};
}[keyof ParamList];
