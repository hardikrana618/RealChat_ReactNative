import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@/store';
import NavigatorContainer from './navigators';
import {SocketProvider} from './context/SocketContext';
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SocketProvider>
        <NavigatorContainer />
      </SocketProvider>
    </Provider>
  );
}
export default App;
