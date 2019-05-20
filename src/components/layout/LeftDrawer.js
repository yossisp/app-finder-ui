import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { DrawerStyles } from '../styles/Material-UI/muiStyles.js';
import DrawerMenusList from './DrawerMenusList.js';
import AccountInfo from './AccountInfo.js';

class LeftDrawer extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open: open
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton color="inherit"
                    aria-label="Open drawer"
                    aria-haspopup="true"
                    aria-owns='simple-menu'
                    onClick={this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>
            <AccountInfo>

            </AccountInfo>
            <DrawerMenusList classes={classes} />
          </div>
        </Drawer>
      </div>
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(DrawerStyles)(LeftDrawer);
