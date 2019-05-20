import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { SimpleExpansionPanelStyles } from '../styles/Material-UI/muiStyles.js';
import PortraitModeMessage from './PortraitModeMessage.js';
import AppTrends from './AppTrends.js';
import constants from '../../constants.js';
import { setLoadingStatus } from '../../actions/appActions.js';
const { LAYOUT: { PORTRAIT, LANDSCAPE,
  ORIENTATION_CHANGE, ORIENTATION_MEDIA_QUERY} } = constants;

class SimpleExpansionPanel extends React.Component {
  state = {
    screenOrientation: null
  }

  componentDidMount() {
    const { screenOrientation } = this.state;
    const { setLoadingStatus } = this.props;
    if (!screenOrientation) {
      setLoadingStatus(true);
      this.handleScreenOrientation();
    }
    window.addEventListener(ORIENTATION_CHANGE, this.handleScreenOrientation);
  }

  /*
  timeout is needed here because querying screen orientation in window media
  doesn't return correct orientation immediately. So we need to wait for next tick
   */
  handleScreenOrientation = () => setTimeout(() => {
    const { setLoadingStatus } = this.props;
    this.setScreenOrientation();
    setLoadingStatus(false);
  }, 0);

  isMobilePortraitMode = () => {
    console.log(this.state);
    const { screenOrientation } = this.state;
    return isMobile && screenOrientation === PORTRAIT;
  }

  isScreenOrientationReceived = () => {
    const { screenOrientation } = this.state;
    return !!screenOrientation;
  }

  setScreenOrientation = () => {
    if (window.matchMedia(ORIENTATION_MEDIA_QUERY(PORTRAIT)).matches) {
      this.setState({
        screenOrientation: PORTRAIT
      });
    }

    if (window.matchMedia(ORIENTATION_MEDIA_QUERY(LANDSCAPE)).matches) {
      this.setState({
        screenOrientation: LANDSCAPE
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.backgroundColor}
                        style={{ backgroundColor: classes.backgroundColor }}
                        disabled={!this.isScreenOrientationReceived()}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>More Info</Typography>
          </ExpansionPanelSummary>
          { this.isMobilePortraitMode() ? <PortraitModeMessage /> : <AppTrends />}
        </ExpansionPanel>
      </div>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleExpansionPanelWithStyles = withStyles(SimpleExpansionPanelStyles,
  { withTheme: true })(SimpleExpansionPanel);
export default connect(null,
  { setLoadingStatus })(SimpleExpansionPanelWithStyles);
