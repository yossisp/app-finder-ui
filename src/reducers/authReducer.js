import {
  GOOGLE_INIT_IN_PROGRESS, GOOGLE_INIT_DONE,
  LOGGED_IN, LOGGED_OUT, RECEIVE_AUTH_TOKEN,
  HTTP_STATUS_CODE, DESTROY_AUTH_TOKEN, USER_INFO
} from '../actions/types.js';

const initialState = {
  googleInit: false,
  loggedIn: false,
  token: null,
  httpStatusCode: 200,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GOOGLE_INIT_IN_PROGRESS: return {
      ...state,
      googleInit: false
    };

    case GOOGLE_INIT_DONE: return {
      ...state,
      googleInit: true
    };

    case LOGGED_IN: return {
      ...state,
      loggedIn: true
    };

    case LOGGED_OUT: return {
      ...state,
      loggedIn: false
    };

    case RECEIVE_AUTH_TOKEN: return {
      ...state,
      token: action.payload
    };

    case DESTROY_AUTH_TOKEN: return {
      ...state,
      token: null
    };

    case HTTP_STATUS_CODE: return {
      ...state,
      httpStatusCode: action.payload
    };

    case USER_INFO: return {
      ...state,
      user: action.payload
    };

    default: return state;
  }
}
