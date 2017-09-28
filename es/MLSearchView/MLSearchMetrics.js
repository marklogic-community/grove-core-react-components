import React from 'react';
import PropTypes from 'prop-types';

var MLSearchMetrics = function MLSearchMetrics(_ref) {
  var time = _ref.time,
      total = _ref.total;

  return React.createElement(
    'span',
    null,
    'Found ',
    total,
    ' results in ',
    time.toFixed(3),
    ' seconds.'
  );
};

MLSearchMetrics.propTypes = process.env.NODE_ENV !== "production" ? {
  time: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
} : {};

export default MLSearchMetrics;