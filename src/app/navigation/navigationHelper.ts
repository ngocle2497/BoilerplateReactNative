import { navigate } from './navigationService';
import { APP_SCREEN } from './screenTypes';


export function navigateToHome(params?: object) {
  navigate(APP_SCREEN.AUTHORIZE.ROOT, params);
}

export function navigateToLogin(params?: object) {
  navigate(APP_SCREEN.UN_AUTHORIZE.LOGIN, params);
}

export function navigateToSplash(params?: object) {
  navigate(APP_SCREEN.UN_AUTHORIZE.SPLASH, params);
}
