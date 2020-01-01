export interface ResponseBase<T> {
  code: number;

  msg: string;

  data?: T;

  status: boolean;
}
export interface ResponseError {
  data: any;

  status: number;

  header: any;
}

export interface ErrorAxios {
  response?: ResponseError;

  request?: any;

  message?: string;

  config: any;
}

export interface RequestBase<T> {
  type?: string;
  url: string;
  data?: T;
}
export interface ActionBase<T> {
  type: string;
  payload?: T;
}
