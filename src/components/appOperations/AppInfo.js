import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../../constants.js';
import AppFound from '../layout/AppFound.js';
import TryAgain from '../layout/TryAgain.js';
import { updateActiveMenu } from '../../actions/appActions.js';

class AppInfo extends React.Component {
  getAppAttributesNames = () => {
    const appAttributes = constants.APP_INFO.APP_ATTRIBUTES;
    const reduced = Object.values(appAttributes).reduce((resultArray, attribute) => {
      return resultArray.concat(attribute);
    },[]);

    return reduced.filter(attribute => {
      return attribute !== constants.APP_INFO.APP_ATTRIBUTES.appStore;
    });
  }

  getAppAttributesValues = (appAttributes) => {
    console.log(`JSON.stringify(appAttributes)=${JSON.stringify(appAttributes)}`);
    const appAttributesKeys = Object.keys(constants.APP_INFO.APP_ATTRIBUTES);
    const values = appAttributesKeys.map(key => appAttributes[key]);

    return values.filter(v => {
      return (v !== constants.APP_STORES.IOS && v !== constants.APP_STORES.ANDROID);
    });
  }

  componentDidMount() {
    this.props.updateActiveMenu(constants.MENU_NAMES.APP_INFO);
  }

  render() {
    const { app } = this.props;
    const { found, appStore } = app;
    if (found) {
      return (
        <AppFound appAttributesNames={this.getAppAttributesNames()}
                  appAttributesValues={this.getAppAttributesValues(app)}
                  appStore={appStore}
        />
      );
    } else {
      return <TryAgain />;
    }

  }
}

AppInfo.propTypes = {
  app: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  app: state.app.app
});

export default connect(mapStateToProps, { updateActiveMenu } )(AppInfo);


