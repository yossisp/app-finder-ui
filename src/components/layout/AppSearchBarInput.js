import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAppInfo, clearAppData, setSnackBarStatus,
  setLoadingStatus } from '../../actions/appActions.js';
import constants from '../../constants.js';
import { AppSearchBarInputStyles } from '../styles/Material-UI/muiStyles.js';
import AppNotFound from './AppNotFound.js';

class AppSearchBarInput extends Component {
  state = {
    appId: ''
  }

  _isMounted = false;

  onChange = e => {
    this.setState({ appId: e.target.value });
    console.log(`from onChange=${e.target.value}\nstate=${JSON.stringify(this.state.appId)}`);
  }

  onKeyDown = e => {
    const { appId } = this.state;
    const { app, clearAppData, setSnackBarStatus,
      getAppInfo, setLoadingStatus, token } = this.props;
    const { found } = app;

    if (e.keyCode === constants.ENTER_KEY) {
      //clear previous search results/error-messages once typing again
      clearAppData();
      console.log(`from onKeyDown: found=${found}, appId:${appId}`)

      if (appId === '') {
        console.log('appId is blank');
        setSnackBarStatus(true);
      } else {
        getAppInfo(appId, token)
          .then(appFoundStatus => {
            setLoadingStatus(false);
            if (appFoundStatus) {
              this.props.history.push(constants.CLIENT_ROUTES.APP)
            }
            if (this._isMounted) {
              this.setState({ appId: '' });
            }
          }).catch(e => console.error(e));
      }
    }
  }

  handleCloseSnackBar = () => {
    const { setSnackBarStatus } = this.props;
    setSnackBarStatus(false);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillMount() {
    this._isMounted = false;
  }

  render() {
    const { classes, app, loading, snackBarOpen } = this.props;
    const { found, appId } = app;
    let snackBarMessage = '';

    if (found === undefined) {
      snackBarMessage = constants.MESSAGES.APP_BLANK();
    } else if (found === false) {
      snackBarMessage = constants.MESSAGES.APP_NOT_FOUND(appId);
    }
    console.log(`snackBarOpen: ${snackBarOpen}`);

    return (
      <div>
        <InputBase
          placeholder={loading ? constants.SEARCH_BAR.LOADING : constants.SEARCH_BAR.SEARCH_APP }
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.state.appId}
          disabled={loading > 0} />
        <AppNotFound message={snackBarMessage}
                     open={snackBarOpen}
                     onClose={this.handleCloseSnackBar} />
      </div>
    )
  }
}

AppSearchBarInput.propTypes = {
  classes: PropTypes.object.isRequired,
  snackBarOpen: PropTypes.bool.isRequired,
  app: PropTypes.object.isRequired,
  clearAppData: PropTypes.func.isRequired,
  setSnackBarStatus: PropTypes.func.isRequired,
  getAppInfo: PropTypes.func.isRequired,
  setLoadingStatus: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  console.log(`from ${mapStateToProps.name}: found = ${state.app.app.found}
  \nloading = ${state.global.loading}`);
  return {
    app: state.app.app,
    snackBarOpen: state.app.snackBarOpen,
    loading: state.global.loading,
    token: state.auth.token
  }
};

const AppSearchBarWithStyles = withStyles(AppSearchBarInputStyles)(AppSearchBarInput);
const AppSearchBarWithStylesConnected = connect(mapStateToProps,
  { getAppInfo, clearAppData, setSnackBarStatus,
    setLoadingStatus })(AppSearchBarWithStyles);
export default withRouter(AppSearchBarWithStylesConnected);