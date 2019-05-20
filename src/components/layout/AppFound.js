import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography/Typography';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import Paper from '@material-ui/core/es/Paper/Paper';
import { AppInfoStyles } from '../styles/Material-UI/muiStyles.js';
import AppStoreIcon from './AppStoreIcon.js';
import AppMoreInfoExpansionPanel from './AppMoreInfoExpansionPanel.js';

class AppFound extends React.Component {
  render() {
    const {
      classes, appAttributesNames, appAttributesValues,
      appStore
    } = this.props;

    return (
      <div>
        <div>
          <Typography variant="h6" className={classes.title}>
            App Details
          </Typography>
        </div>
        <div>
          <Paper className={classes.paper}>
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start">
              <Grid item style={{ maxWidth: 300, overflow: 'auto' }}>
                <List>
                  <ListItem style={{ height: 50 }}>
                    <ListItemText primary={<div>App Store</div>}/>
                  </ListItem>
                  {
                    appAttributesNames.map((elem, i) => (
                      <ListItem key={i} style={{ height: 50 }}>
                        <ListItemText primary={<div>{elem}</div>}/>
                      </ListItem>
                    ))
                  }
                </List>
              </Grid>
              <Grid item style={{ maxWidth: 600, overflow: 'auto' }}>
                <List>
                  <AppStoreIcon appStore={appStore}/>
                  {
                    appAttributesValues.map((elem, i) => (
                      <ListItem key={i} style={{ height: 50 }}>
                        <ListItemText primary={(<div>{elem}</div>)}/>
                      </ListItem>
                    ))
                  }
                </List>
              </Grid>
            </Grid>
          </Paper>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end">
            <AppMoreInfoExpansionPanel />
          </Grid>
        </div>
      </div>
    );
  }
}

AppFound.propTypes = {
  appAttributesNames: PropTypes.array.isRequired,
  appAttributesValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  appStore: PropTypes.string.isRequired
};

export default withStyles(AppInfoStyles, { withTheme: true })(AppFound);
