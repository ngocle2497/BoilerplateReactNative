import { navigate } from './navigationService';
import { APP_SCREEN } from './screenTypes';

export function navigateToHome() {
  navigate(APP_SCREEN.AUTHORIZE);
}

export function navigateToLogin() {
  navigate(APP_SCREEN.LOGIN);
}

export function navigateToSplash() {
  navigate(APP_SCREEN.SPLASH);
}
