/* eslint-disable @typescript-eslint/no-explicit-any */
import {ResponseBase} from "@config/type";
import {AxiosError, AxiosResponse} from "axios";
import {
  RESULT_CODE_PUSH_OUT,
  ERROR_NETWORK_CODE,
  STATUS_TIME_OUT,
  CODE_TIME_OUT,
  CODE_SUCCESS,
} from "@config";
import {HandleErrorApi} from "@common";

import {translate} from "../utils";
const responseDefault: ResponseBase<any> = {
  code: -500,
  status: false,
  msg: translate("error:errorData"),
  data: {},
};

export const _onPushLogout = async () => {
  // TODO
  /**
   * do something to logout
   */
};
export const handleResponseAxios = (res: AxiosResponse): ResponseBase<any> => {
  if (res.data) {
    return {code: CODE_SUCCESS, status: true, data: res.data, msg: null};
  }
  return responseDefault;
};
export const handleErrorAxios = (error: AxiosError): ResponseBase<any> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return HandleErrorApi(CODE_TIME_OUT);
  }
  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return HandleErrorApi(RESULT_CODE_PUSH_OUT);
    } else {
      return HandleErrorApi(error.response.status);
    }
  }
  return HandleErrorApi(ERROR_NETWORK_CODE);
};
