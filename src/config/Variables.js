import {IS_DEBUG, IS_LIVE, BASEURL, WEBSOCKETURL, IMG_BASEURL} from '@env';

const AppStateStr = {
  active: 'active',
  inactive: 'inactive',
  background: 'background',
};

const asyncKeys = {
  USER_TOKEN: '@USER_TOKEN',
  LOGIN_SESSION: '@IS_LOGGEDIN',
};

export default {
  AppStateStr,
  asyncKeys,
  isDebug: IS_DEBUG,
  isLive: IS_LIVE,
  BASEURL: BASEURL,
  WEBSOCKETURL: WEBSOCKETURL,
  IMG_BASEURL: IMG_BASEURL,
};
