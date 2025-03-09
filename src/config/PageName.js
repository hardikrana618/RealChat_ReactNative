const AuthScreen = {
  UserNameScreen: 'UserNameScreen',
};
const AppScreen = {
  HomeScreen: 'HomeScreen',
  ChatScreen: 'ChatScreen',
};

export default {
  AuthStack: 'AuthStack',
  AppStack: 'AppStack',
  SplashScreen: 'SplashScreen',
  ...AuthScreen,
  ...AppScreen,
};
