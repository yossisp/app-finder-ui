import { isInProduction } from './utils/utils.js';

const constants = {

  PROTOCOL: isInProduction() ? 'https' : 'http',
  get SERVER_BASE_URL() {
    return `${this.PROTOCOL}://${isInProduction() ? process.env.REACT_APP_PROD_URL : 'localhost'}`;
  },
  SERVER_PORT: isInProduction() ? '443' : '3000',
  SERVER_ROUTES: {
    APP: 'api/app',
    TREND: 'api/trends/',
    LOGIN: 'api/auth/login'
  },
  CLIENT_ROUTES: {
    APP: '/appInfo',
    LOGIN: '/login',
    HOME: '/'
  },
  Q_PARAMS: {
    ID: 'appId',
    NAME: 'appName'
  },
  UTILS: {
    buildURL: route => `${constants.SERVER_BASE_URL}:${constants.SERVER_PORT}/${route}`
  },
  ENTER_KEY: 13,
  APP_INFO: {
    APP_ATTRIBUTES: {
      appId: 'App ID',
      appName: 'App Name',
      appStore: 'App Store',
      contentRating: 'Content Rating',
      version: 'Version',
      category: 'Category'
    }
  },
  MESSAGES: {
    APP_NOT_FOUND: appId => `The information for the App Id ${appId} is not available because it was not found in any app store.`,
    APP_BLANK: () => 'Please enter a non-empty App ID',
    GRAPH_DESCRIPTION: appName => `The graph below represents Google Trends search data for ${appName}.
    The y-axis 100 point represents the peak amount of searches for the app, the rest of y-axis values are
    relative to the 100 mark.`
  },
  MENUS: [
    {
      name: 'Upload CSV',
      route: '/uploadCSV'
    },
    {
      name: 'About',
      route: '/about'
    }
  ],
  MENU_NAMES: {
    ABOUT: 'About',
    UPLOAD_CSV: 'Upload CSV',
    APP_INFO: 'AppInfo',
    LOG_OUT: 'Log Out'
  },
  APP_STORES: {
    ANDROID: 'android',
    IOS: 'ios'
  },
  LAYOUT: {
    SNACKBAR_TIME: 6000,
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
    ORIENTATION_CHANGE: 'orientationchange',
    ORIENTATION_MEDIA_QUERY: mode => `(orientation: ${mode})`
  },
  JSON_FORMAT: {
    APP_ID_STR: 'appId'
  },
  RESULT_CSV_PREFIX: 'result_',
  RESULT_CSV_DEFAULT_NAME: 'result.csv',
  RESULT_CSV_DL_URL_REVOKE_TIME: 60000,
  CONTENT_TYPES: {
    CSV: 'application/octet-stream',
    JSON: 'application/json'
  },
  AUTH: {
    GOOGLE: {
      RETRY_INTERVAL: 100
    },
    BEARER_STR: 'Bearer ',
    HEADERS: {
      AUTHORIZATION: 'Authorization',
      CONTENT_TYPE: 'Content-Type'
    }
  },
  REDUX: {
    THROTTLE: 1000
  },
  SEARCH_BAR: {
    LOADING: 'Loading...',
    SEARCH_APP: 'Search App…'
  },
  SIGNATURE: {
    TITLE: 'My Github Profile',
    LINK: 'https://github.com/yossisp',
    NAME: 'Yossi Spektor'
  }
};

console.log(`env=${process.env.REACT_APP_ENV}`);
console.log(`port=${constants.SERVER_PORT}`);
export default constants;
