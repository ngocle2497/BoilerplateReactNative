import Axios from 'axios';
import {HandleErrorApi} from '../../common/handleError/index';
import {BASE_API} from './api';
import AsyncStorage from '@react-native-community/async-storage';
import {ERROR_NETWORK_CODE} from '../../config';
import R from '../../assets/value';
const Instance = Axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
function* Get(url, param = null) {
  let header = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });

  return yield Instance.get(url, {params: param, headers: header})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

function* Post(url, data) {
  let header = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val};
    }
  });
  return yield Instance.post(url, data, {headers: header})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
function* PostWithFile(url, data) {
  let header = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {
        token: val,
        'Content-Type': 'multipart/form-data',
      };
    }
  });
  return yield Instance.post(url, data, {headers: header})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
function* PostFile(url, FormData, params = null) {
  let header = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return yield Instance.post(url, {params: params, data: FormData})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}

function* Put(url, data, params = null) {
  let header = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return yield Instance.put(url, {params: params, data: data})
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response) {
        return HandleErrorApi(error.response.status);
      } else {
        return HandleErrorApi(ERROR_NETWORK_CODE);
      }
    });
}
function* Delete(url, data, params = null) {
  let header = {};
  yield AsyncStorage.getItem(R.strings.TOKEN).then(val => {
    if (val) {
      header = {token: val, 'Content-Type': 'application/json'};
    }
  });
  return yield Instance.delete(url, {params: params, data: data})
    .then(res => {
      return res.data;
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
