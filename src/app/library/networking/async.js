import Axios from 'axios';
import {HandleErrorApi} from '../../common/handleError/index';
import {BASE_API} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {ERROR_NETWORK_CODE, RESULT_CODE_PUSH_OUT} from '../../config';
import DropDownAlert from '../utils/dropDownHolder';
import I18n from '../utils/i18n';
import R from '../../assets/value';
import {remove} from '../utils/storage';
import {navigateToLogin} from '../../navigation/navigationHelper';

const responseDefault = {
  code: -500,
  status: false,
  msg: I18n.t('error:errorData'),
  data: {},
};
const _onPushLogout = () => {
  remove([R.strings.TOKEN]).then(val => {});
  DropDownAlert.showError(
    I18n.t('dialog:lbTitleError'),
    I18n.t('error:pushLogout'),
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
async function Get(url, param = null) {
  let header = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.get(url, {params: param, headers: header})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

async function Post(url, data) {
  let header = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val};
    }
  });
  return Instance.post(url, data, {headers: header})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function PostWithFile(url, data) {
  let header = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {
        token: val,
        'Content-Type': 'multipart/form-data',
      };
    }
  });
  return Instance.post(url, data, {headers: header})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function PostFile(url, FormData, params = null) {
  let header = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.post(url, {params: params, data: FormData})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

async function Put(url, data, params = null) {
  let header = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.put(url, {params: params, data: data})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
async function Delete(url, data, params = null) {
  let header = {};
  await AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return Instance.delete(url, {params: params, data: data})
    .then(res => {
      if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
      } else {
        if (res.data) {
          return res.data;
        }
        return responseDefault;
      }
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
export const Service = {
  Get,
  Post,
  Put,
  Delete,
  PostFile,
  PostWithFile,
};
