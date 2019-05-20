import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarMessageStyles } from '../styles/Material-UI/muiStyles.js';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

class SnackbarMessage extends React.Component {
  render() {
    const {
      classes, message, onClose, variant
    } = this.props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
          </span>
        }
        action={
          <IconButton
            aria-label="Close"
            color="inherit"
            onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        }
      />
    );
  }
}

SnackbarMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
};

export default withStyles(SnackbarMessageStyles)(SnackbarMessage);
