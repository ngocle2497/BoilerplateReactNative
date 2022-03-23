/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_NETWORK_CODE } from '@config/api';
import { ResponseBase } from '@config/type';
import { translate } from '@utils';

const handleData = (responseError: ResponseBase<any>) => {
  return responseError;
};

export const HandleErrorApi = (status: number) => {
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        msg: translate('error:errorNetwork'),
        data: null,
        status: false,
      });
    case 200:
      return handleData({
        code: status,
        msg: translate('error:0'),
        data: null,
        status: false,
      });
    case 400:
      return handleData({
        code: status,
        msg: translate('error:400'),
        data: null,
        status: false,
      });
    case 401:
      return handleData({
        code: status,
        msg: translate('error:401'),
        data: null,
        status: false,
      });
    case 402:
      return handleData({
        code: status,
        msg: translate('error:402'),
        data: null,
        status: false,
      });
    case 403:
      return handleData({
        code: status,
        msg: translate('error:403'),
        data: null,
        status: false,
      });
    case 404:
      return handleData({
        code: status,
        msg: translate('error:404'),
        data: null,
        status: false,
      });
    case 405:
      return handleData({
        code: status,
        msg: translate('error:405'),
        data: null,
        status: false,
      });
    case 406:
      return handleData({
        code: status,
        msg: translate('error:406'),
        data: null,
        status: false,
      });
    case 407:
      return handleData({
        code: status,
        msg: translate('error:407'),
        data: null,
        status: false,
      });
    case 408:
      return handleData({
        code: status,
        msg: translate('error:408'),
        data: null,
        status: false,
      });

    case 409:
      return handleData({
        code: status,
        msg: translate('error:409'),
        data: null,
        status: false,
      });
    case 410:
      return handleData({
        code: status,
        msg: translate('error:410'),
        data: null,
        status: false,
      });

    case 411:
      return handleData({
        code: status,
        msg: translate('error:411'),
        data: null,
        status: false,
      });
    case 412:
      return handleData({
        code: status,
        msg: translate('error:412'),
        data: null,
        status: false,
      });

    case 413:
      return handleData({
        code: status,
        msg: translate('error:413'),
        data: null,
        status: false,
      });
    case 414:
      return handleData({
        code: status,
        msg: translate('error:414'),
        data: null,
        status: false,
      });
    case 415:
      return handleData({
        code: status,
        msg: translate('error:415'),
        data: null,
        status: false,
      });
    case 416:
      return handleData({
        code: status,
        msg: translate('error:416'),
        data: null,
        status: false,
      });
    case 417:
      return handleData({
        code: status,
        msg: translate('error:417'),
        data: null,
        status: false,
      });
    case 500:
      return handleData({
        code: status,
        msg: translate('error:500'),
        data: null,
        status: false,
      });
    case 501:
      return handleData({
        code: status,
        msg: translate('error:501'),
        data: null,
        status: false,
      });
    case 502:
      return handleData({
        code: status,
        msg: translate('error:502'),
        data: null,
        status: false,
      });
    case 503:
      return handleData({
        code: status,
        msg: translate('error:503'),
        data: null,
        status: false,
      });
    case 504:
      return handleData({
        code: status,
        msg: translate('error:504'),
        data: null,
        status: false,
      });
    case 505:
      return handleData({
        code: status,
        msg: translate('error:505'),
        data: null,
        status: false,
      });

    default:
      if (status > 503) {
        return handleData({
          code: status,
          msg: translate('error:serverError'),
          data: null,
          status: false,
        });
      } else if (status < 500 && status >= 400) {
        return handleData({
          code: status,
          msg: translate('error:errorOnRequest'),
          data: null,
          status: false,
        });
      } else {
        return handleData({
          code: status,
          msg: translate('error:errorOnHandle'),
          data: null,
          status: false,
        });
      }
  }
};
