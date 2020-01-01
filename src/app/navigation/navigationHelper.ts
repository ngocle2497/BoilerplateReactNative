import NavigationService from './navigationService';
import * as ScreenTypes from './screenTypes';

export function navigateToHome(params?: object) {
  NavigationService.navigate(ScreenTypes.HOME, params);
}

export function navigateToLogin(params?: object) {
  NavigationService.navigate(ScreenTypes.LOGIN, params);
}

export function navigateToSplash(params?: object) {
  NavigationService.navigate(ScreenTypes.SPLASH, params);
}
