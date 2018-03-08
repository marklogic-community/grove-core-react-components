import React from 'react';
import PropTypes from 'prop-types';

var SearchMetrics = function SearchMetrics(_ref) {
  var time = _ref.time,
      total = _ref.total;

  if (!time && !total) {
    return null;
  }
  var announcement = 'Found ';
  if (total || total === 0) {
    announcement = announcement + (total + ' ');
  }
  announcement = announcement + 'results';
  if (time) {
    announcement = announcement + (' in ' + time.toFixed(3) + ' seconds');
  }
  announcement = announcement + '.';
  return React.createElement(
    'span',
    null,
    announcement
  );
};

SearchMetrics.propTypes = process.env.NODE_ENV !== "production" ? {
  time: PropTypes.number,
  total: PropTypes.number
} : {};

export default SearchMetrics;