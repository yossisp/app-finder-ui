import {
  CHECK_APP, CLEAR_APP_DATA,
  APP_SEARCH_SNACKBAR_OFF, APP_SEARCH_SNACKBAR_ON,
  LOGIN_ANIMATION_LOADED, LOGIN_ANIMATION_NOT_LOADED
} from '../actions/types.js';

const initialState = {
  app: {},
  snackBarOpen: false,
  loginAnimationLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECK_APP: return {
      ...state,
      app: action.payload,
      loading: false
    };

    case CLEAR_APP_DATA: return {
      ...state,
      app: {}
    };

    case APP_SEARCH_SNACKBAR_ON: return {
      ...state,
      snackBarOpen: true
    };

    case APP_SEARCH_SNACKBAR_OFF: return {
      ...state,
      snackBarOpen: false
    };

    case LOGIN_ANIMATION_LOADED: return {
      ...state,
      loginAnimationLoaded: true
    };

    case LOGIN_ANIMATION_NOT_LOADED: return {
      ...state,
      loginAnimationLoaded: false
    };

    default: return state;
  }
}
