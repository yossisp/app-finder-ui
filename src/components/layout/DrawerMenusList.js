import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import constants from '../../constants.js';

import { updateActiveMenu,
  setLoggedInStatus,
  destroyAuthToken,
  setLoginAnimationLoaded
} from '../../actions/appActions.js';

class DrawerMenusList extends React.Component {
  redirect = (menuName) => {
    const menuToRedirect = constants.MENUS.find(currMenu => {
      const { name } = currMenu;
      return name === menuName;
    });
    const { route } = menuToRedirect;
    this.props.history.push(route);
  }

  onClick = (menu) => {
    this.props.updateActiveMenu(menu);
    this.redirect(menu);
  }

  onLogOut = () => {
    const { setLoggedInStatus, destroyAuthToken, setLoginAnimationLoaded } = this.props;
    setLoggedInStatus(false);
    destroyAuthToken();
    setLoginAnimationLoaded(false);
  }

  render() {
    const { classes } = this.props;
    const { MENU_NAMES: { ABOUT, UPLOAD_CSV, LOG_OUT }} = constants;
    return (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={this.onClick.bind(this, ABOUT)}>
            <ListItemIcon>
              <i className="fas fa-info-circle fa-2x" />
            </ListItemIcon>
            <ListItemText primary={ABOUT} />
          </ListItem>
          <ListItem button onClick={this.onClick.bind(this, UPLOAD_CSV)}>
            <ListItemIcon>
              <i className="fas fa-file-upload fa-2x" />
            </ListItemIcon>
            <ListItemText primary={UPLOAD_CSV} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.onLogOut}>
            <ListItemIcon>
              <i className="fas fa-sign-out-alt fa-2x" />
            </ListItemIcon>
            <ListItemText primary={LOG_OUT} />
          </ListItem>
        </List>
      </div>
    );
  }
}

DrawerMenusList.propTypes = {
  classes: PropTypes.object.isRequired,
  updateActiveMenu: PropTypes.func.isRequired
};

const DrawerMenusListConnected = connect(null, {
  updateActiveMenu, setLoggedInStatus,
  destroyAuthToken, setLoginAnimationLoaded })(DrawerMenusList);
export default withRouter(DrawerMenusListConnected);
