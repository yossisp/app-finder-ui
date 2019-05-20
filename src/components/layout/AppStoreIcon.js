import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import constants from '../../constants.js';

const AppStoreIcon = ({ appStore }) => {
  if (appStore === constants.APP_STORES.ANDROID) {
    return (
      <ListItem style={{ height: 50 }}>
        <i className="fab fa-google-play fa-3x" />
      </ListItem>
    );
  }
  return (
      <ListItem style={{ height: 50 }}>
        <i className="fab fa-app-store fa-3x" />
      </ListItem>
  );
};

AppStoreIcon.propTypes = {
  appStore: PropTypes.string.isRequired
};

export default AppStoreIcon;
