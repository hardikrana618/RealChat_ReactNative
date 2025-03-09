import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {PageName} from '@/config';
import {clearStorage} from '@/utils';
import {store} from '@/store';
import ActionType from '@/reducers/actions/ActionType';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export function navigateToHomeWithModal() {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: PageName.AppStack,
      params: {
        screen: PageName.HomeScreen, // Navigate to Home screen
        params: {
          screen: PageName.TravelingScreen, // Open Traveling screen as modal
        },
      },
    }),
  );
}

export const navigatePush = (name: string, params: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

type RouteType = {
  /**
   * The name or component to use for the floating label.
   */
  name: string;
  params?: object; // optional params
};

/**
 * Clears storage, dispatches a logout action, and navigates to the AuthStack screen.
 */
export const logoutNavigation = async () => {
  store.dispatch({type: ActionType.LOGOUT});
  await clearStorage();
  navigateAndSimpleReset([{name: PageName.AuthStack}], 0);
};

export const navigateAndReset = (
  routes: RouteType[] = [],
  index: number = 0,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes,
      }),
    );
  }
};

export const navigateAndSimpleReset = (
  routes: RouteType[] = [],
  index: number = 0,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes,
      }),
    );
  }
};

export function navigateReplace(name: navName, param?: Object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, param));
  }
}
export function navigateResetRoutenames(names: String[]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({routeNames: names}));
  }
}

export const goBack = () => {
  navigationRef.goBack();
};

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false, // default header is making screen flicker on android
  animation: 'slide_from_right',
  // statusBarAnimation: 'slide',
  // statusBarStyle: 'auto',
};
export const transcreenOptions: NativeStackNavigationOptions | any = {
  headerShown: false, // default header is making screen flicker on android
  statusBarAnimation: 'slide',
  animation: 'slide_from_right',
  // statusBarStyle: 'dark',
  headerTitle: '',
  headerTransparent: true,
  profileButtonProps: {},
};

export const modalscreenOption = {
  headerShown: 'false',
  presentation: 'transparentModal',
  animation: 'slide_from_bottom',
};

export const authScreenOptions = {
  headerShown: false, // default header is making screen flicker on android
  statusBarAnimation: 'slide',
  animation: 'slide_from_right',
  statusBarStyle: 'light',
};
