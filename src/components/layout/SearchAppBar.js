import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/es/LinearProgress/LinearProgress';
import AppSearchBarInput from './AppSearchBarInput.js';
import LeftDrawer from './LeftDrawer.js';

// styles
import { MaterialHeaderStyles } from '../styles/Material-UI/muiStyles.js';

class SearchAppBar extends React.Component {
  render() {
    const { classes, activeMenu, loading } = this.props;
    console.log(`activeMenu=${activeMenu}`);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          {loading > 0 && <LinearProgress color='secondary'/>}
          <Toolbar>
            <LeftDrawer />
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              {activeMenu}
            </Typography>
            <div className={classes.grow}/>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <AppSearchBarInput />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  activeMenu: PropTypes.string.isRequired,
  loading: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  activeMenu: state.global.activeMenu,
  loading: state.global.loading
});

const MaterialHeaderWithStyles = withStyles(MaterialHeaderStyles)(SearchAppBar);
export default connect(mapStateToProps, null)(MaterialHeaderWithStyles);
