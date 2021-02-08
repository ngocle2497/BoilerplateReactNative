export type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type OmitByType<T, K extends  keyof T> = Exclude<T, K>;
