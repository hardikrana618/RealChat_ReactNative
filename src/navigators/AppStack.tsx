import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenOptions} from './Navigationref';
import {PageName} from '@/config';
import * as Screens from '@/screens';

const Stack = createNativeStackNavigator();
export default function () {
  return (
    <Stack.Navigator
      // initialRouteName={PageName.''}
      screenOptions={screenOptions}>
      <Stack.Screen name={PageName.HomeScreen} component={Screens.HomeScreen} />
      <Stack.Screen name={PageName.ChatScreen} component={Screens.ChatScreen} />
    </Stack.Navigator>
  );
}
