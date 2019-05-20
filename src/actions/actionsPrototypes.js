import {
  APP_SEARCH_SNACKBAR_ON, APP_SEARCH_SNACKBAR_OFF,
  CHECK_APP, CLEAR_APP_DATA, UPDATE_MENU,
  LOADING_ON, LOADING_OFF,
  GOOGLE_INIT_DONE, GOOGLE_INIT_IN_PROGRESS,
  LOGGED_IN, LOGGED_OUT, REDIRECT_URL, RECEIVE_AUTH_TOKEN,
  HTTP_STATUS_CODE, USER_INFO, LOGIN_ANIMATION_LOADED,
  DESTROY_AUTH_TOKEN, LOGIN_ANIMATION_NOT_LOADED
} from './types.js';
import constants from '../constants.js';

const toggleAppSearchSnackBarOn = {
  type: APP_SEARCH_SNACKBAR_ON
};

const toggleAppSearchSnackBarOff = {
  type: APP_SEARCH_SNACKBAR_OFF
};

const lookupAppResult = appJSON => ({
  type: CHECK_APP,
  payload: appJSON
});

const updateMenu = menu => ({
  type: UPDATE_MENU,
  payload: menu
});

const clearData = {
  type: CLEAR_APP_DATA
};

const loadingOn = {
  type: LOADING_ON
};

const loadingOff = {
  type: LOADING_OFF
};

const googleInitInProgress = {
  type: GOOGLE_INIT_IN_PROGRESS
};

const googleInitDone = {
  type: GOOGLE_INIT_DONE
};

const loggedIn = {
  type: LOGGED_IN
};

const loggedOut = {
  type: LOGGED_OUT
};

const redirectUrl = URL => ({
  type: REDIRECT_URL,
  payload: URL
});

const authToken = token => ({
  type: RECEIVE_AUTH_TOKEN,
  payload: token ? `${constants.AUTH.BEARER_STR}${token}` : token
});

const httpStatusCode = code => ({
  type: HTTP_STATUS_CODE,
  payload: code
});

const userInfo = user => ({
  type: USER_INFO,
  payload: user
});

const loginAnimationLoaded = () => ({
  type: LOGIN_ANIMATION_LOADED
});

const loginAnimationNotLoaded = () => ({
  type: LOGIN_ANIMATION_NOT_LOADED
});

const setAuthTokenToNull = () => ({
  type: DESTROY_AUTH_TOKEN
});

export {
  toggleAppSearchSnackBarOn,
  toggleAppSearchSnackBarOff,
  lookupAppResult,
  updateMenu,
  clearData,
  loadingOn,
  loadingOff,
  googleInitInProgress,
  googleInitDone,
  loggedIn,
  loggedOut,
  redirectUrl,
  authToken,
  httpStatusCode,
  userInfo,
  loginAnimationLoaded,
  loginAnimationNotLoaded,
  setAuthTokenToNull
};
