import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/es/Button/Button';
import Grid from '@material-ui/core/es/Grid/Grid';
import withStyles from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';
import Logo from './Logo.js';
import Signature from './Signature.js';
import { LoginStyles } from '../styles/Material-UI/muiStyles.js';
import { logWithTime } from '../../utils/utils.js';
import { SignInText } from '../../assets/text.js';

class WelcomeScreen extends React.Component {
  render() {
    logWithTime('from WelcomeScreen');
    const { classes, loginAnimationLoaded, loginButtonOnClick } = this.props;
    const { logo, signature, loginButton } = classes;
    console.log(`animationLoaded=${loginAnimationLoaded}`);
    return (
      <Grid container direction='column'
            justify="center"
            alignItems="center">
        <Grid item className={logo}>
          <Logo />
        </Grid>
        <Grid item className={signature}>
          <Signature isVisible={loginAnimationLoaded} />
        </Grid>
        <Grid item className={loginButton}>
          {loginAnimationLoaded
          && <Button variant="contained"
                  component="span"
                  onClick={loginButtonOnClick}
                  color={'primary'}>
            {SignInText}
          </Button>}
        </Grid>
      </Grid>
    );
  }
}

WelcomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  loginAnimationLoaded: PropTypes.bool.isRequired,
  loginButtonOnClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loginAnimationLoaded: state.app.loginAnimationLoaded
});

const WelcomeScreenWithStyles = withStyles(LoginStyles)(WelcomeScreen);
export default connect(mapStateToProps, null)(WelcomeScreenWithStyles);
