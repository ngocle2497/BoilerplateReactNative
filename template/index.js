import { AppRegistry, Text, TextInput } from 'react-native';

import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import './declare';
import { MyApp } from './src/app';

Text.defaultProps = Text.defaultProps || {
  allowFontScaling: false,
};

TextInput.defaultProps = TextInput.defaultProps || {
  allowFontScaling: false,
  autoCorrect: false,
  spellCheck: false,
};

AppRegistry.registerComponent(appName, () => MyApp);
