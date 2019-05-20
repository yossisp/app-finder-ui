import React from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';

const TryAgain = () => (
  <div>
    <Grid container direction='column'
          justify="center"
          alignItems="center">
      <Grid item style={{ height: 200 }} />
      <Grid item style={{ height: 200 }}>
        <div className='crying-emoji'>
          <i className="far fa-sad-cry fa-9x" style={{ color: '#bdbdbd' }} />
        </div>
      </Grid>
    </Grid>
  </div>);

export default TryAgain;
