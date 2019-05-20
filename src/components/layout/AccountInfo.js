import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { AccountInfoStyles } from '../styles/Material-UI/muiStyles.js';

class AccountInfo extends React.Component {
  render() {
    const { user: { givenName, picture }, classes: { gridItem } } = this.props;

    return (
      <Grid container direction="row"
            justify="flex-start"
            alignItems="flex-start">
        <Grid item>
          <Avatar alt='My Account' src={picture} className={gridItem} />
        </Grid>
        <Grid item>
          <div className={gridItem}>
            Welcome {givenName}
          </div>
        </Grid>
      </Grid>
    );
  }
}

AccountInfo.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

const AccountInfoWithStyles = withStyles(AccountInfoStyles)(AccountInfo);
export default connect(mapStateToProps, null)(AccountInfoWithStyles);
