import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle.js';
import { loggerMiddleware } from './middleware/reduxMiddleware.js';
import rootReducer from './reducers/combinedReducers.js';
import { loadState, saveState } from './classes/LocalStorageUtils.js';
import constants from './constants.js';
import { isInProduction, isReduxDevToolsEnabled } from './utils/utils.js';

const persistedState = loadState();
const middleware = [thunk, loggerMiddleware];
let store;

if (isInProduction() || !isReduxDevToolsEnabled()) {
  store = createStore(rootReducer, persistedState,
    compose(applyMiddleware(...middleware)));
  console.log('redux dev tools disabled');
} else {
  store = createStore(rootReducer, persistedState,
    compose(applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  console.log('redux dev tools enabled');
}

store.subscribe(throttle(() => {
  const { httpStatusCode, loggedIn, ...otherParams } = store.getState().auth;
  saveState({
    auth: otherParams
  });
}, constants.REDUX.THROTTLE));

export default store;
