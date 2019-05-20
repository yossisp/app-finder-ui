import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Material-UI/d3graph.css';
import { NoTrendDataFound } from '../../assets/text.js';

function NoTrendData({ appName }) {
  return (
    <div>
      <div>
        {NoTrendDataFound} <i>{appName}</i>
      </div>
      <i className="far fa-meh-rolling-eyes fa-5x"/>
    </div>
  );
}

NoTrendData.propTypes = {
  appName: PropTypes.string.isRequired
};

export default NoTrendData;
