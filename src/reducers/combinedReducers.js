import { combineReducers } from 'redux';
import appReducer from './appReducer.js';
import globalReducer from './globalReducer.js';
import authReducer from './authReducer.js';

export default combineReducers({
  app: appReducer,
  global: globalReducer,
  auth: authReducer
});
