import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Material-UI/d3graph.css';
import { connect } from 'react-redux';
import { setLoadingStatus, setHttpStatusCode } from '../../actions/appActions.js';
import * as d3 from 'd3';
import constants from '../../constants';
import NoTrendData from './NoTrendData.js';
import Typography from '@material-ui/core/es/Typography/Typography';
import { handleApiResponse } from '../../utils/utils.js';

class AppTrends extends React.Component {
  state = {
    trendData: null,
  }

  _isMounted = false;

  shouldDisplayGraph = () => {
    const { trendData } = this.state;
    return (trendData && trendData.length > 0);
  }

  drawLineGraph = () => {
    const node = this.node;
    const { trendData } = this.state;
    console.log(`node is null = ${node === null || node === undefined}`);

    if (!this.shouldDisplayGraph()) {
      return;
    }

    console.log(`trendData 1st date = ${trendData[0].formattedDate},
    value=${trendData[0].value}`);

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 60, left: 50},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // define the line
    const valueline = d3.line()
      .x(function(d) { return x(d.milliseconds); })
      .y(function(d) { return y(d.value); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(trendData, function(d) { return d.milliseconds; }));
    y.domain([0, d3.max(trendData, function(d) { return d.value; })]);


    // Add the valueline path.
    svg.append("path")
      .data([trendData])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%d-%b-%y")))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-35)");

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
  }

  fetchTrendData = () => {
    const { setLoadingStatus, setHttpStatusCode, app, token } = this.props;
    const { appName } = app;
    const URL = constants.UTILS.buildURL(constants.SERVER_ROUTES.TREND);
    const query = `?${constants.Q_PARAMS.NAME}=${appName}`;
    const URLquery = `${URL}${query}`;
    const { AUTHORIZATION } = constants.AUTH.HEADERS;
    setLoadingStatus(true);
    console.log(`AppTrends URLquery=${URLquery}`);

    fetch(URLquery, {
      method: 'GET',
      mode: 'cors',
      headers: {
        [AUTHORIZATION]: token
      }
    }).then(response => {
      const handledResponse = handleApiResponse(response, setHttpStatusCode);
      if (handledResponse) {
        return response.json();
      }
      setLoadingStatus(false);
      return Promise.reject('api error');
    })
      .then(trendData => {
        setLoadingStatus(false);
        if (this._isMounted) {
          this.setState({ trendData });
          this.drawLineGraph();
        }
      })
      .catch(e => {
        setLoadingStatus(false);
        console.error(e);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchTrendData();
  }

  componentDidUpdate() {
    this.drawLineGraph();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { app } = this.props;
    const { appName } = app;
    return (
      <div>
        {
          this.shouldDisplayGraph() &&
            <div>
              <Typography>
                {constants.MESSAGES.GRAPH_DESCRIPTION(appName)}
              </Typography>
              <svg ref={node => this.node = node}>
              </svg>
            </div>
        }
        {
          !this.shouldDisplayGraph() && <NoTrendData appName={appName}/>
        }
      </div>
      );
  }
}

AppTrends.propTypes = {
  app: PropTypes.object.isRequired,
  setLoadingStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    app: state.app.app,
    token: state.auth.token
  }
};

export default connect(mapStateToProps, { setLoadingStatus, setHttpStatusCode })(AppTrends);
