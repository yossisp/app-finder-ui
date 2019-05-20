import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setLoggedInStatus } from '../../actions/appActions.js';
import { isExpiredToken, isUnauthorizedHttpCode } from '../../utils/utils.js';
import constants from '../../constants'

class ParentContainer extends React.Component {
  checkLoginStatus = () => {
    const { loggedIn, setLoggedInStatus, token, httpStatusCode } = this.props;
    if (!loggedIn && !isExpiredToken(token, true) && !isUnauthorizedHttpCode(httpStatusCode)) {
      setLoggedInStatus(true);
    }

    if (isUnauthorizedHttpCode(httpStatusCode) || (loggedIn && isExpiredToken(token, true))) {
      setLoggedInStatus(false);
    }
  }

  componentDidUpdate(prevProps) {
    const { redirectURL } = this.props;
    this.checkLoginStatus();

    console.log(`prevProps.loggedIn=${prevProps.loggedIn},this.props.loggedIn=${this.props.loggedIn}`);
    const isLoggingOut = prevProps.loggedIn && !this.props.loggedIn;
    const isLoggingIn = !prevProps.loggedIn && this.props.loggedIn;

    if (isLoggingIn) {
      this.props.history.replace(redirectURL);
    } else if (isLoggingOut) {
      console.warn('redirecting to login')
      this.props.history.replace(constants.CLIENT_ROUTES.LOGIN);
    }
  }

  render() {
    console.log('from render');
    return this.props.children;
  }
}

ParentContainer.propTypes = {
  history: PropTypes.object.isRequired,
  redirectURL: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  children: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    httpStatusCode: state.auth.httpStatusCode,
    redirectURL: state.global.redirectURL
  };
};

const ParentContainerConnected = connect(mapStateToProps,
  { setLoggedInStatus })(ParentContainer);
export default withRouter(ParentContainerConnected);
