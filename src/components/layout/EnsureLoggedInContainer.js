import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setRedirectURL } from '../../actions/appActions.js';
import constants from '../../constants.js';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { currentURL, loggedIn, setRedirectURL } = this.props;
    console.log(`loggedIn=${loggedIn}`);
    if (!loggedIn) {
      console.log(`currentURL = ${currentURL}`);
      setRedirectURL(currentURL);
      this.props.history.replace(constants.CLIENT_ROUTES.LOGIN);
    }
  }

  render() {
    const { loggedIn } = this.props;
    console.log(`loggedIn = ${loggedIn}`);
    if (!loggedIn) {
      return null;
    }

    return this.props.children;
  }
}

EnsureLoggedInContainer.propTypes = {
  children: PropTypes.array.isRequired,
  history: PropTypes.object,
  currentURL: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  setRedirectURL: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    currentURL: ownProps.location.pathname
  };
}

const EnsureLoggedInContainerConnected = connect(mapStateToProps,
  { setRedirectURL })(EnsureLoggedInContainer);
export default withRouter(EnsureLoggedInContainerConnected);
