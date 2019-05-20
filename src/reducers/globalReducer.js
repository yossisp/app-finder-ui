import {
  UPDATE_MENU,
  LOADING_ON, LOADING_OFF,
  REDIRECT_URL
} from '../actions/types.js';
import constants from '../constants.js';

const initialState = {
  activeMenu: constants.MENU_NAMES.ABOUT,
  loading: 0,
  redirectURL: constants.MENUS[1].route
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_MENU: return {
      ...state,
      activeMenu: action.payload
    };

    case LOADING_ON: return {
      ...state,
      loading: state.loading + 1
    };

    case LOADING_OFF: return {
      ...state,
      // simple sanity check that loading doesn't become negative
      loading: state.loading >= 1 ? state.loading - 1 : 0
    };

    case REDIRECT_URL: return {
      ...state,
      redirectURL: action.payload
    };

    default: return state;
  }
}
