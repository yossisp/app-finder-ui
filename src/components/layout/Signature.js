import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/es/styles/withStyles';
import { SignatureStyles } from '../styles/Material-UI/muiStyles.js';
import constants from '../../constants.js';

class Signature extends React.Component {
  render() {
    const { classes: { madeBy, developer }, isVisible } = this.props;
    if (isVisible) {
      return (
        <div className={madeBy}>
          made with <i className="fas fa-heart fa-1x"
                       style={{ color: 'orangered' }}/> by &nbsp;
          <a href={constants.SIGNATURE.LINK}
             title={constants.SIGNATURE.TITLE}
             target="_blank"
             rel="noopener noreferrer"
             className={developer} style={{ textDecoration: 'none' }}>
            {constants.SIGNATURE.NAME}
          </a>
        </div>
      );
    }

    return null;
  }
}

Signature.propTypes = {
  classes: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default withStyles(SignatureStyles)(Signature);
