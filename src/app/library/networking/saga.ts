import { ResponseBase, ErrorAxios } from './../../config/type';
import Axios from 'axios';
import { HandleErrorApi } from '../../common/handleError/index';
import { BASE_API } from './api';
import AsyncStorage from '@react-native-community/async-storage';
import { ERROR_NETWORK_CODE, RESULT_CODE_PUSH_OUT } from '../../config';
import DropDownAlert from '../utils/dropDownHolder';
import { R } from '../../assets/value';
import { navigateToLogin } from '../../navigation/navigationHelper';
import { translate } from '../utils/i18n/translate';

const responseDefault: ResponseBase<any> = {
  code: -500,
  status: false,
  msg: translate('error:errorData'),
  data: {},
};
const _onPushLogout = async () => {
  await AsyncStorage.removeItem(R.strings.TOKEN);
  DropDownAlert.showError(
    translate('dialog:lbTitleError'),
    translate('error:pushLogout'),
  );
  navigateToLogin();
};
const Instance = Axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
function* Get(url: string, param?: object) {
  let header: any = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val) {
      header = { token: val, 'Content-Type': 'application/json' };
    }
  });
  return yield Instance.get(url, {
    params: param,
    headers: header,
  })
    .then((res: any) => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

function* Post(url: string, data: object) {
  let header: any = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val) {
      header = { token: val };
    }
  });
  return yield Instance.post(url, data, { headers: header })
    .then((res: any) => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
function* PostWithFile(url: string, data: object) {
  let header: any = {};
  AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val) {
      header = {
        token: val,
        'Content-Type': 'multipart/form-data',
      };
    }
  });
  return yield Instance.post(url, data, { headers: header })
    .then((res: any) => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

function* Put(url: string, data: object, params?: object) {
  let header: any = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val) {
      header = { token: val, 'Content-Type': 'application/json' };
    }
  });
  return yield Instance.put(url, { params: params, data: data })
    .then((res: any) => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
function* Delete(url: string, data: object, params?: object) {
  let header: any = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then((val: any) => {
    if (val) {
      header = { token: val, 'Content-Type': 'application/json' };
    }
  });
  return yield Instance.delete(url, {
    params: params,
    data: data,
  })
    .then((res: any) => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch((error: ErrorAxios) => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
export const ServiceSaga = {
  Get,
  Post,
  Put,
  Delete,
  PostWithFile,
};
