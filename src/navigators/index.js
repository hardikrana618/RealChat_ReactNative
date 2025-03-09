import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {authScreenOptions, navigationRef, screenOptions} from './Navigationref';
import {PageName} from '@/config';
import * as Screen from '@/screens';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();
function NavigatorContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={PageName.SplashScreen}>
        <Stack.Screen
          name={PageName.SplashScreen}
          component={Screen.SplashScreen}
          options={authScreenOptions}
        />
        <Stack.Screen
          name={PageName.AuthStack}
          component={AuthStack}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={PageName.AppStack}
          component={AppStack}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigatorContainer;
