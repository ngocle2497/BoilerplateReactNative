/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';

import {MyApp} from './src/app';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => MyApp);
