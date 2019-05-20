import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import constants from '../../constants.js';
import SnackbarMessage from './SnackbarMessage.js';

class AppNotFound extends React.Component {
  render() {
    const { message, open, onClose } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={constants.LAYOUT.SNACKBAR_TIME}
        onClose={onClose} >
        <SnackbarMessage
          onClose={onClose}
          variant="warning"
          message={message}
        />
      </Snackbar>
    );
  }
}

AppNotFound.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AppNotFound;
