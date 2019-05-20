import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants.js';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import Grid from '@material-ui/core/es/Grid/Grid';
import { UploadCSVstyles } from '../styles/Material-UI/muiStyles.js';
import withStyles from '@material-ui/core/es/styles/withStyles';
import { connect } from 'react-redux';
import BlobDownload from '../../classes/BlobDownload.js';
import AppIdCSVExampleDialog from './AppIdCSVExampleDialog.js';
import { setLoadingStatus, setHttpStatusCode } from '../../actions/appActions.js';
import { handleApiResponse } from '../../utils/utils.js';

class UploadCSV extends React.Component {
  state = {
    uploadedFile: null,
    appJSONArray: null,
    fileName: constants.RESULT_CSV_DEFAULT_NAME
  }

  downloadCSV = (appJSONArray) => {
    const { setLoadingStatus, setHttpStatusCode, token } = this.props;
    const { fileName } = this.state;
    const serverRoute = constants.SERVER_ROUTES.APP;
    const URL = constants.UTILS.buildURL(serverRoute);
    const { AUTHORIZATION, CONTENT_TYPE } = constants.AUTH.HEADERS;
    setLoadingStatus(true);
    fetch(URL, {
      method: 'POST',
      headers: {
        mode: 'cors',
        [AUTHORIZATION]: token,
        [CONTENT_TYPE]: constants.CONTENT_TYPES.JSON
      },
      body: JSON.stringify(appJSONArray)
    })
      .then(response => {
        const handledResponse = handleApiResponse(response, setHttpStatusCode);
        if (handledResponse) {
          return handledResponse.blob();
        } else {
          setLoadingStatus(false);
          return Promise.reject('api error');
        }
      })
      .then(serverBlob => {
        const dl = new BlobDownload(window, serverBlob, fileName,
          constants.CONTENT_TYPES.CSV);
        dl.download()
          .catch(e => console.error(e));
        setLoadingStatus(false);
      })
      .catch(e => {
        console.error(e);
      });
  }

  convertAppListToJSON = appList => {
    const appArray = appList.split('\n');
    const appJSONArray = [];
    appArray.forEach(app => {
      appJSONArray.push({
        [constants.JSON_FORMAT.APP_ID_STR]: app
      });
    });
    console.log(appJSONArray);
    return appJSONArray;
  }

  readCSVFile = (file) => {
    try {
      if (file) {
        console.log(file);
        const reader = new FileReader();
        reader.onload = event => {
          const CSVcontent = reader.result;
          console.log(CSVcontent);
          const appJSONArray = this.convertAppListToJSON(CSVcontent);
          this.downloadCSV(appJSONArray);

        }
        reader.onerror = error => console.error(error);
        reader.readAsText(file, 'utf8');
      }
    } catch (err) {
      console.error(err);
    }
  }

  onSubmit = (e) => {
    const { uploadedFile } = this.state;
    e.preventDefault();
    this.readCSVFile(uploadedFile);
  }

  onChange = e => {
    if (e.target.files[0]) {
      this.setState({
        uploadedFile: e.target.files[0],
        fileName: `${constants.RESULT_CSV_PREFIX}${e.target.files[0].name}`
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.description}>
          You can upload a CSV file containing app id's in one column.
        </Typography>
        <Grid container className={classes.grid} spacing={16}>
          <Grid item>
            <input
              accept="text/csv"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.onChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" className={classes.button}>
                Choose files
              </Button>
            </label>
          </Grid>
          <Grid item>
            <form onSubmit={this.onSubmit}>
              <Button variant="contained" className={classes.button} type="submit">
                Upload
              </Button>
            </form>
          </Grid>
        </Grid>
        <Grid container className={classes.gridDialog} spacing={16}>
          <Grid item>
            <AppIdCSVExampleDialog fullScreen={false} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

UploadCSV.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.global.loading,
    token: state.auth.token
  };
};

const UploadCSVstylesWithStyles = withStyles(UploadCSVstyles)(UploadCSV);
export default connect(mapStateToProps, {
  setLoadingStatus, setHttpStatusCode })(UploadCSVstylesWithStyles);
