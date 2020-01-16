import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';

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

const AppSwitchNavigation = createAnimatedSwitchNavigator(
  {
    [ScreenTypes.UN_AUTHORIZE]: {screen: UnAuthorizeStack},
    [ScreenTypes.AUTHORIZE]: {screen: AuthorizedStack},
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={300}
          interpolation="linear"
        />
        <Transition.In type="slide-right" durationMs={300} />
      </Transition.Together>
    ),
  },
);

export const AppContainer = createAppContainer(AppSwitchNavigation);
