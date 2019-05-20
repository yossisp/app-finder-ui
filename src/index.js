import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import App from './App';
import MaterialBlueTheme from './components/layout/MaterialBlueTheme.js';
import * as serviceWorker from './serviceWorker';
import store from './store.js';

// remove debug messages if necessary
if (process.env.REACT_APP_DEBUG === 'false') {
  console.log('DEBUG=false');
  window.console.log = () => {};
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={MaterialBlueTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
