/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

if (Platform.OS == 'ios') {
  require('@/hooks/KeyBoardManager');
}

global.log = (message, ...args) => {
  if (__DEV__) {
    console.log(`FlipperLog ${message}`, ...args);
  }
};

AppRegistry.registerComponent(appName, () => App);
