import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/es/LinearProgress/LinearProgress';
import constants from '../../constants.js';
import { setGoogleAuthStatus,
  setAuthToken, setUserInfo } from '../../actions/appActions.js';
import { isExpiredToken, getUserInfo } from '../../utils/utils.js';
import WelcomeScreen from '../layout/WelcomeScreen.js';

class Login extends React.Component {
  /*
initializes GoogleAuth object. must be the first method before other
auth methods are called
 */
  init = (callback) => {
    console.log(`client_id: ${process.env.REACT_APP_CLIENT_ID}`);
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_CLIENT_ID,
        })
        .then(callback);
    });
  }

  googleLoadTimer = setInterval(() => {
    const { setGoogleAuthStatus } = this.props;
    if (window.gapi) {
      this.init(() => {
        clearInterval(this.googleLoadTimer);
        setGoogleAuthStatus(true);
      });
    }
  }, constants.AUTH.GOOGLE.RETRY_INTERVAL);

  getGoogleToken = () => new Promise((resolve, reject) => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn()
      .then((response) => {
        const authDetails = response.getAuthResponse();
        console.log(`authDetails=${JSON.stringify(authDetails)}`);
        resolve(authDetails.id_token);
      }).catch(err => {
      console.error(err);
      reject();
    });
  });

  getFetchTokenOptions = (token) => ({
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': constants.CONTENT_TYPES.JSON,
      'Accept': constants.CONTENT_TYPES.JSON
    },
    body: JSON.stringify({
      token
    })
  });

  /*
  returns true if token was set, else false
   */
  getTokenFromServerApi = async (token) => {
    const { setAuthToken, setUserInfo } = this.props;
    let result = false;

    const loginUrl = constants.UTILS.buildURL(constants.SERVER_ROUTES.LOGIN);
    console.log(loginUrl);

    try {
      const response = await fetch(loginUrl, this.getFetchTokenOptions(token));
      if (response.status === 200) {
        const { token } = await response.json();
        console.log(`tokenFromAPI=${JSON.stringify(token)}`);
        if (!isExpiredToken(token, false)) {
          setAuthToken(token);
          console.log(`token after setAuthToken=${token}`);
          const user = getUserInfo(token);
          setUserInfo(user);
          result = true;
        }
      }
    } catch (err) {
      console.error(err);
    }

    return result;
  }

  /*
  the method must be called after auth init.
   */
  handleSignIn = async () => {
    const token = await this.getGoogleToken();
    console.log(`google id_token =${token}`);
    await this.getTokenFromServerApi(token);
  }

  render() {
    console.log(`DEBUG=${process.env.REACT_APP_DEBUG}`);
    const { googleInit } = this.props;
    return (
      <div>
        {!googleInit && <LinearProgress color='secondary'/>}
        {googleInit && <WelcomeScreen loginButtonOnClick={this.handleSignIn}/>}
      </div>
    );
  }
}

Login.propTypes = {
  googleInit: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    googleInit: state.auth.googleInit
  };
};

const LoginConnected = connect(mapStateToProps,
  { setGoogleAuthStatus, setAuthToken, setUserInfo })(Login);
export default withRouter(LoginConnected);
