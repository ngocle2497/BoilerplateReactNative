import {navigate} from './navigationService';
import * as ScreenTypes from './screenTypes';

export function navigateToHome(params?: object) {
  navigate(ScreenTypes.AUTHORIZE, params);
}

export function navigateToLogin(params?: object) {
  navigate(ScreenTypes.LOGIN, params);
}

export function navigateToSplash(params?: object) {
  navigate(ScreenTypes.SPLASH, params);
}
