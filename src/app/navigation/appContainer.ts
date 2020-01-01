import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Login} from '../features/unAuthentication/login/screens/index';
import {Main} from '../features/authentication/main/index';
import * as ScreenTypes from './screenTypes';

const UnAuthorizeStack = createStackNavigator(
  {
    [ScreenTypes.LOGIN]: {screen: Login},
  },
  {headerMode: 'none'},
);
const AuthorizedStack = createStackNavigator(
  {
    [ScreenTypes.HOME]: {screen: Main},
  },
  {headerMode: 'none'},
);

const AppSwitchNavigation = createSwitchNavigator({
  [ScreenTypes.UN_AUTHORIZE]: {screen: UnAuthorizeStack},
  [ScreenTypes.AUTHORIZE]: {screen: AuthorizedStack},
});

export const AppContainer = createAppContainer(AppSwitchNavigation);
