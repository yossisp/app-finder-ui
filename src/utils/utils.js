import decodeJWT from 'jwt-decode';
import jsonwebtoken from 'jsonwebtoken';

const extractTokenFromBearer = (bearerString) => {
  console.log(`bearerString=${bearerString}`);
  if (bearerString) {
    const [, token] = bearerString.split(' ');
    return token;
  }
  return bearerString;
};

const isExpiredToken = (inToken, tokenContainsBearer) => {
  let result = true;
  const token = tokenContainsBearer ? extractTokenFromBearer(inToken) : inToken;
  console.log(`token=${token}`);

  if (!token) {
    return result;
  }

  try {
    const decodedToken = decodeJWT(token);
    const { exp: expiryTime } = decodedToken;
    result = (expiryTime < (Date.now() / 1000));
    console.log(`date in ms= ${Date.now() / 1000}`);
  } catch (err) {
    console.error(err);
  }
  return result;
};

const getUserInfo = (token) => {
  const payload = jsonwebtoken.decode(token);
  const { givenName, picture } = payload;
  return {
    givenName,
    picture
  };
};

const isUnauthorizedHttpCode = code => (code === 401);

const errorCallbacks = {
  200: (fetchResponse, setHttpStatusCodeCb) => {
    console.log(`fetchResponse.status=${fetchResponse.status}`);
    setHttpStatusCodeCb(fetchResponse.status);
    return fetchResponse;
  },
  204: (fetchResponse, setHttpStatusCodeCb) => {
    console.log(`fetchResponse.status=${fetchResponse.status}`);
    setHttpStatusCodeCb(fetchResponse.status);
    return fetchResponse;
  },
  401: (fetchResponse, setHttpStatusCodeCb) => {
    console.error(`fetchResponse.status=${fetchResponse.status}`);
    setHttpStatusCodeCb(fetchResponse.status);
    return null;
  },
  500: (fetchResponse, setHttpStatusCodeCb) => {
    console.error(`fetchResponse.status=${fetchResponse.status}`);
    setHttpStatusCodeCb(fetchResponse.status);
    return null;
  }
};

const handleApiResponse = (fetchResponse, setHttpStatusCodeCb) => errorCallbacks[fetchResponse.status](fetchResponse, setHttpStatusCodeCb);

const logWithTime = (input) => {
  const time = new Date();
  console.log(`${input}|${time.getSeconds()}s:${time.getMilliseconds()}ms`);
};

const isInProduction = () => process.env.REACT_APP_ENV === 'production';

const isReduxDevToolsEnabled = () => process.env.REACT_APP_REDUX_DEV_TOOLS === 'true';

export {
  isExpiredToken,
  isUnauthorizedHttpCode,
  handleApiResponse,
  getUserInfo,
  logWithTime,
  isInProduction,
  isReduxDevToolsEnabled
};
