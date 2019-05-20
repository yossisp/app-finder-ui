import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { whatIsAppIdTitle } from '../../assets/text.js';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class WhatIsAppIdDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {whatIsAppIdTitle}
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {whatIsAppIdTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              An app id is a unique id of a mobile application. You can find the app id in the page URL of a specific app in its
              respective app store. For example, this is the iOS URL for WhatsApp:&nbsp;
              <span style={{color: '#673ab7'}}>https://itunes.apple.com/app/whatsapp-messenger/id<b>310633997</b>?mt=8</span>.
              The id is 310633997. For Android URL:&nbsp;
              <span style={{color: '#673ab7'}}>
                https://play.google.com/store/apps/details?id=<b>com.whatsapp</b>
              </span>
              &nbsp;the id is com.whatsapp.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(WhatIsAppIdDialog);