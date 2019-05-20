import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/es/Grid/Grid';
import { intro, usage } from '../../assets/text.js';
import { AboutStyles } from '../styles/Material-UI/muiStyles.js';
import WhatIsAppIdDialog from './WhatIsAppIdDialog.js';

class About extends React.Component {
  render() {
    const { classes } = this.props;
    const { root, text, textGrid } = classes;
    return (
      <div>
        <Paper className={root} elevation={1}>
          <Grid container direction='column'
                justify="center"
                alignItems="flex-start">
            <Grid item className={textGrid}>
              <Typography component="p" className={text}>
                {intro}
              </Typography>
            </Grid>
            <Grid item className={textGrid}>
              <Typography component="p" className={text}>
                {usage}
              </Typography>
            </Grid>
            <Grid item className={textGrid}>
              <WhatIsAppIdDialog />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(AboutStyles)(About);
