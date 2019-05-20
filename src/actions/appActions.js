import {
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
} from './actionsPrototypes.js';
import constants from '../constants.js';
import { handleApiResponse } from '../utils/utils.js';

const setHttpStatusCode = code => (dispatch) => {
  dispatch(httpStatusCode(code));
};

const setLoggedInStatus = status => (dispatch) => {
  if (status) {
    dispatch(loggedIn);
  } else {
    dispatch(loggedOut);
  }
};

const setSnackBarStatus = status => (dispatch) => {
  if (status) {
    dispatch(toggleAppSearchSnackBarOn);
  } else {
    dispatch(toggleAppSearchSnackBarOff);
  }
};

const getAppInfo = (appId, token) => async (dispatch) => {
  let appJSON = { appId };

  if (appId !== '') {
    const { AUTHORIZATION } = constants.AUTH.HEADERS;
    console.log(`from getAppInfo=${appId}`);
    const URL = constants.UTILS.buildURL(constants.SERVER_ROUTES.APP);
    const query = `?${constants.Q_PARAMS.ID}=${appId}`;
    console.log(`${URL}${query}`);
    dispatch(loadingOn);
    const response = await fetch(`${URL}${query}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        [AUTHORIZATION]: token
      }
    });

    const handledResponse = handleApiResponse(response,
      code => dispatch(httpStatusCode(code)));

    if (handledResponse) {
      appJSON = await handledResponse.json();
      const { found } = appJSON;
      console.log(`appJSON = ${appJSON}`);
      dispatch(lookupAppResult(appJSON));
      if (found === false) {
        dispatch(toggleAppSearchSnackBarOn);
      }

      return found;
    }
  }
};

const updateActiveMenu = menu => (dispatch) => {
  dispatch(updateMenu(menu));
};

const clearAppData = () => (dispatch) => {
  dispatch(clearData);
};

const setLoadingStatus = status => (dispatch) => {
  if (status) {
    dispatch(loadingOn);
  } else {
    dispatch(loadingOff);
  }
};

const setGoogleAuthStatus = status => (dispatch) => {
  if (status) {
    dispatch(googleInitDone);
  } else {
    dispatch(googleInitInProgress);
  }
};

const setRedirectURL = URL => (dispatch) => {
  dispatch(redirectUrl(URL));
};

const setAuthToken = token => (dispatch) => {
  dispatch(authToken(token));
};

const setUserInfo = user => (dispatch) => {
  dispatch(userInfo(user));
};

const setLoginAnimationLoaded = status => (dispatch) => {
  if (status) {
    dispatch(loginAnimationLoaded());
  } else {
    dispatch(loginAnimationNotLoaded());
  }
};

const destroyAuthToken = () => (dispatch) => {
  dispatch(setAuthTokenToNull());
};

export {
  getAppInfo,
  updateActiveMenu,
  clearAppData,
  setSnackBarStatus,
  setLoadingStatus,
  setGoogleAuthStatus,
  setLoggedInStatus,
  setRedirectURL,
  setAuthToken,
  setHttpStatusCode,
  setUserInfo,
  setLoginAnimationLoaded,
  destroyAuthToken
};
